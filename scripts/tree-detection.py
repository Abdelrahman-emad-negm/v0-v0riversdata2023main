import cv2
import numpy as np
from pathlib import Path
import json
import sys

class TreeDetectionSystem:
    """Tree detection system with shape and texture analysis"""
    
    def __init__(self):
        self.min_green_threshold = 1000  # Minimum green pixels to consider as a tree
        
    def load_image(self, image_path):
        """Load image with support for Unicode paths"""
        try:
            with open(image_path, 'rb') as f:
                file_bytes = np.asarray(bytearray(f.read()), dtype=np.uint8)
            image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
            return image
        except Exception as e:
            print(f"Error loading image: {e}", file=sys.stderr)
            return None
    
    def detect_sky(self, image):
        """Detect sky region to exclude it from tree detection"""
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Create sky mask
        sky_mask = np.zeros(image.shape[:2], dtype=np.uint8)
        
        # Blue sky detection
        lower_blue = np.array([100, 80, 80])
        upper_blue = np.array([130, 255, 255])
        blue_mask = cv2.inRange(hsv, lower_blue, upper_blue)
        
        # Very bright white sky detection
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        bright_mask = cv2.threshold(gray, 220, 255, cv2.THRESH_BINARY)[1]
        
        # Combine sky masks
        sky_mask = cv2.bitwise_or(blue_mask, bright_mask)
        
        # Small dilation
        kernel = np.ones((5, 5), np.uint8)
        sky_mask = cv2.dilate(sky_mask, kernel, iterations=1)
        
        return sky_mask
    
    def detect_tree_vegetation(self, image):
        """Detect vegetation that looks like trees"""
        if image is None:
            return 0, None
        
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Detect green colors
        green_masks = []
        
        # Standard green
        lower1 = np.array([35, 40, 40])
        upper1 = np.array([85, 255, 255])
        mask1 = cv2.inRange(hsv, lower1, upper1)
        green_masks.append(mask1)
        
        # Yellow-green
        lower2 = np.array([25, 30, 30])
        upper2 = np.array([45, 255, 255])
        mask2 = cv2.inRange(hsv, lower2, upper2)
        green_masks.append(mask2)
        
        # Dark green
        lower3 = np.array([40, 40, 20])
        upper3 = np.array([80, 255, 200])
        mask3 = cv2.inRange(hsv, lower3, upper3)
        green_masks.append(mask3)
        
        # Combine all green masks
        green_mask = cv2.bitwise_or(green_masks[0], green_masks[1])
        green_mask = cv2.bitwise_or(green_mask, green_masks[2])
        
        # Remove sky regions
        sky_mask = self.detect_sky(image)
        green_mask = cv2.bitwise_and(green_mask, cv2.bitwise_not(sky_mask))
        
        # Texture analysis
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        laplacian = np.abs(laplacian).astype(np.uint8)
        texture_mask = cv2.threshold(laplacian, 10, 255, cv2.THRESH_BINARY)[1]
        
        # Combine green color with texture
        vegetation_mask = cv2.bitwise_and(green_mask, texture_mask)
        
        # Morphological operations
        kernel_small = np.ones((3, 3), np.uint8)
        kernel_large = np.ones((5, 5), np.uint8)
        vegetation_mask = cv2.morphologyEx(vegetation_mask, cv2.MORPH_OPEN, kernel_small)
        vegetation_mask = cv2.morphologyEx(vegetation_mask, cv2.MORPH_CLOSE, kernel_large)
        
        # Filter by blob size
        contours, _ = cv2.findContours(vegetation_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        final_mask = np.zeros_like(vegetation_mask)
        min_area = 100
        
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > min_area:
                cv2.drawContours(final_mask, [contour], -1, 255, -1)
        
        count = cv2.countNonZero(final_mask)
        return count, final_mask
    
    def calculate_metrics(self, before_count, after_count, image_size):
        """Calculate metrics and accuracy"""
        total_pixels = image_size[0] * image_size[1]
        
        before_percentage = (before_count / total_pixels) * 100
        after_percentage = (after_count / total_pixels) * 100
        difference = after_count - before_count
        
        if before_count > 0:
            increase_percentage = (difference / before_count) * 100
        else:
            increase_percentage = 100.0 if after_count > 0 else 0.0
        
        tree_detected = difference >= self.min_green_threshold
        
        if tree_detected:
            if difference > 5000:
                accuracy = min(95 + (difference / 10000), 99.9)
            elif difference > 2000:
                accuracy = 85 + (difference / 1000)
            else:
                accuracy = 70 + (difference / 500)
            accuracy = min(accuracy, 99.9)
        else:
            accuracy = (difference / self.min_green_threshold) * 50 if difference > 0 else 0
            accuracy = max(0, min(accuracy, 50))
        
        return {
            'before_count': int(before_count),
            'after_count': int(after_count),
            'before_percentage': float(before_percentage),
            'after_percentage': float(after_percentage),
            'difference': int(difference),
            'increase_percentage': float(increase_percentage),
            'tree_detected': bool(tree_detected),
            'accuracy': float(accuracy)
        }
    
    def analyze_images(self, before_path, after_path):
        """Analyze both images and return results as JSON"""
        before_img = self.load_image(before_path)
        after_img = self.load_image(after_path)
        
        if before_img is None or after_img is None:
            return json.dumps({'error': 'Failed to load images'})
        
        before_count, _ = self.detect_tree_vegetation(before_img)
        after_count, _ = self.detect_tree_vegetation(after_img)
        
        metrics = self.calculate_metrics(before_count, after_count, before_img.shape)
        
        return json.dumps(metrics, indent=2)


def main():
    if len(sys.argv) != 3:
        print(json.dumps({'error': 'Usage: python tree-detection.py <before_image> <after_image>'}))
        sys.exit(1)
    
    before_path = sys.argv[1]
    after_path = sys.argv[2]
    
    detector = TreeDetectionSystem()
    result = detector.analyze_images(before_path, after_path)
    print(result)


if __name__ == "__main__":
    main()
