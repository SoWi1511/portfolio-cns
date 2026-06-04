import os
import subprocess

def compress_images():
    print("Compressing and resizing images to width 600, quality 40...")
    images_dir = "images"
    for i in range(1, 13):
        png_name = f"step{i:02d}.png"
        jpg_name = f"step{i:02d}.jpg"
        png_path = os.path.join(images_dir, png_name)
        jpg_path = os.path.join(images_dir, jpg_name)
        
        if os.path.exists(png_path):
            cmd = ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "40", "--resampleWidth", "600", png_path, "--out", jpg_path]
            print(f"Running: {' '.join(cmd)}")
            subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def update_tex_file():
    print("Updating baitap1.tex image extensions...")
    tex_path = "baitap1.tex"
    if os.path.exists(tex_path):
        with open(tex_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace .png with .jpg for the step images
        new_content = content
        for i in range(1, 13):
            old_str = f"images/step{i:02d}.png"
            new_str = f"images/step{i:02d}.jpg"
            new_content = new_content.replace(old_str, new_str)
            
        with open(tex_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Updated successfully!")
    else:
        print("baitap1.tex not found!")

if __name__ == "__main__":
    compress_images()
    update_tex_file()
