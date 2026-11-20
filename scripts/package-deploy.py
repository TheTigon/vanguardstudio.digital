import os
import shutil
import zipfile

dist_dir = 'dist'
zip_name = 'cloudflare-deploy.zip'

if os.path.exists(dist_dir):
    index_path = os.path.join(dist_dir, 'index.html')
    if os.path.exists(index_path):
        # 1. Cloudflare Pages 404 SPA fallback: 404.html must be a copy of index.html so React handles the routing
        shutil.copy2(index_path, os.path.join(dist_dir, '404.html'))

        # 2. Physical fallback for legacy /tr/ URLs so they never return a server-side 404
        tr_dir = os.path.join(dist_dir, 'tr')
        os.makedirs(tr_dir, exist_ok=True)
        shutil.copy2(index_path, os.path.join(tr_dir, 'index.html'))

    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, dist_dir)
                zipf.write(file_path, arcname)
    print(f"✅ {zip_name} hazırlandı ({os.path.getsize(zip_name)} bayt). Doğrudan Cloudflare Pages'e yüklenebilir.")
