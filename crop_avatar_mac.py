import sys
import os

try:
    import AppKit
    import CoreGraphics
    import Quartz
except ImportError:
    print("This script requires macOS built-in Python (which has PyObjC)")
    sys.exit(1)

def crop_and_resize(input_path, output_path):
    # Load image
    url = AppKit.NSURL.fileURLWithPath_(input_path)
    source = Quartz.CGImageSourceCreateWithURL(url, None)
    if not source:
        print("Failed to load image")
        return
    
    cg_image = Quartz.CGImageSourceCreateImageAtIndex(source, 0, None)
    
    width = Quartz.CGImageGetWidth(cg_image)
    height = Quartz.CGImageGetHeight(cg_image)
    
    # 之前是 x: 65% 导致人物在裁剪后偏右（意味着裁剪框偏左了）。
    # 现在将裁剪框的中心 x 向右移动到 75% 左右，同时稍微往下移动一点点到 48%
    center_x = int(width * 0.73)
    center_y = int(height * 0.48)
    
    # 稍微缩小一点裁剪框，让人显得大一点，并更容易居中
    box_size = int(min(width, height) * 0.32)
    half_box = box_size // 2
    
    left = max(0, center_x - half_box)
    top = max(0, center_y - half_box)
    
    # 确保不越界
    actual_width = min(box_size, width - left)
    actual_height = min(box_size, height - top)
    # 取正方形
    final_size = min(actual_width, actual_height)
    
    crop_rect = Quartz.CGRectMake(left, top, final_size, final_size)
    cropped_cg_image = Quartz.CGImageCreateWithImageInRect(cg_image, crop_rect)
    
    # Save image
    out_url = AppKit.NSURL.fileURLWithPath_(output_path)
    dest = Quartz.CGImageDestinationCreateWithURL(out_url, "public.jpeg", 1, None)
    
    # 设置压缩质量
    options = {Quartz.kCGImageDestinationLossyCompressionQuality: 0.9}
    Quartz.CGImageDestinationAddImage(dest, cropped_cg_image, options)
    Quartz.CGImageDestinationFinalize(dest)
    
    print(f"Successfully saved to {output_path}")

if __name__ == '__main__':
    crop_and_resize("/Users/wangyue/Library/CloudStorage/OneDrive-共享的库-onedrive/cv_web/github/images/ECF100EF-26D6-4208-A9BE-BFCB4C7036CA.jpeg", 
                    "/Users/wangyue/Library/CloudStorage/OneDrive-共享的库-onedrive/cv_web/github/images/avatar.jpg")
