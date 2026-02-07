export function getStorageItem(key){
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
}


export function setStorageItem(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key){
    localStorage.removeItem(key);
}

