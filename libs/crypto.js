import bcrypt from 'bcrypt';

async function hash(password) {
    return await bcrypt.hash(password, 10) // returns a promise, that needs await for its result in user.js
}

async function compareHashes(password, hash) {
    return await bcrypt.compare(password, hash)
}

export { hash, compareHashes };