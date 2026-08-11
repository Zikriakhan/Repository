import re

# Curated list of high quality food images from Unsplash
UNSPLASH_FOOD_IMAGES = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1484723091739-30a597c5f299?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560750133-c5d4ef4de911?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&auto=format&fit=crop"
]

def update_seed_file():
    filepath = 'seed_new_items.js'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    img_counter = [0]
    def replace_loremflickr(match):
        img_url = UNSPLASH_FOOD_IMAGES[img_counter[0] % len(UNSPLASH_FOOD_IMAGES)]
        img_counter[0] += 1
        return f'"image": "{img_url}"'

    new_content = re.sub(r'"image":\s*"https://loremflickr\.com/[^"]*"', replace_loremflickr, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Replaced {img_counter[0]} loremflickr URLs in seed_new_items.js")

if __name__ == '__main__':
    update_seed_file()
