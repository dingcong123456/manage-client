export function qiniuUrl(hash){
    if (hash.indexOf('http')!=-1) return hash;
    return `http://pc43w2wc6.bkt.clouddn.com/${hash}`;
}