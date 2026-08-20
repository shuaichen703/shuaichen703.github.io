import re
import urllib.request
import ssl
import sys

def get_citation_count(scholar_id):
    url = f"https://scholar.google.com/citations?user={scholar_id}&hl=en"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    }
    
    # Ignore SSL certificate verification for local execution if needed
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15, context=ctx) as response:
            html = response.read().decode('utf-8')
            
            # Use regex to find the citation count and h-index
            # The HTML usually has: <td class="gsc_rsb_std">1234</td>
            # The first one is total citations, the second is citations since 2020, 
            # the third is h-index, the fourth is h-index since 2020.
            matches = re.findall(r'<td class="gsc_rsb_std">(\d+)</td>', html)
            if matches and len(matches) >= 3:
                return int(matches[0]), int(matches[2]) # (citations, h_index)
            else:
                print("Could not find citation/h-index count in HTML.")
                return None, None
    except Exception as e:
        print(f"Error fetching citations: {e}")
        return None, None

def update_data_js(file_path, new_count, h_index):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update citations and h-index
    content, c_subs = re.subn(r'累计被引用达\d+次（h-index: \d+）', f'累计被引用达{new_count}次（h-index: {h_index}）', content)
    content, e_subs = re.subn(r'with a total of \d+ citations \(h-index: \d+\)', f'with a total of {new_count} citations (h-index: {h_index})', content)

    if c_subs > 0 or e_subs > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully updated {file_path} with {new_count} citations and h-index {h_index}.")
        return True
    else:
        print("Could not find the target strings to replace in data.js.")
        return False

if __name__ == "__main__":
    scholar_id = "kxpuv3YAAAAJ"
    print(f"Fetching citations for Google Scholar ID: {scholar_id}")
    count, h_index = get_citation_count(scholar_id)
    
    if count is not None and h_index is not None:
        print(f"Current citation count: {count}, h-index: {h_index}")
        success = update_data_js("js/data.js", count, h_index)
        if not success:
            sys.exit(1)
    else:
        print("Failed to fetch citation count.")
        sys.exit(1)
