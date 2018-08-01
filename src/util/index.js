export function qiniuUrl(hash){
    if (hash.indexOf('http')!=-1) return `${hash}?imageView2/2/w/1024/h/1024`;
    return `http://pc43w2wc6.bkt.clouddn.com/${hash}`;
}