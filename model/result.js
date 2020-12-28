const pool = require('../modules/pool');

// 전체 url 목록 조회
exports.readUrls = async(req, res) => {
    const query = 'SELECT * FROM url ORDER BY count DESC LIMIT 20';
    try{
        const result = await pool.queryParam(query);
        return result;
    }catch(err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

// 특정 url 정보 조회
exports.readUrl = async(origin) => {
    const query = `SELECT * FROM url WHERE origin_url='${origin}'`;
    try{
        const result = await pool.queryParam(query);
        return result;
    }catch(err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

// 원본 url 조회
exports.readOriginUrl = async(keyword) => {
    const query = `SELECT origin_url FROM url WHERE keyword='${keyword}'`;
    try{
        const result = await pool.queryParam(query);
        return result;
    }catch(err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

// 원본 url 저장
exports.postOriginUrl = async(origin) => {
    const query = `INSERT INTO url(origin_url) VALUES('${origin}')`;
    try{
        const result = await pool.queryParam(query);
        return result.insertId;
    }catch(err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

// short url 저장
exports.updateShortUrl = async(keyword, idx) => {
    const query = `UPDATE url SET keyword='${keyword}' WHERE idx = ${idx}`;
    try{
        const result = await pool.queryParam(query);
        return result.insertId;
    }catch(err) {
        console.log('ERROR : ', err);
        throw err;
    }
}

// count 증가
exports.updateCount= async(origin) => {
    const query = `UPDATE url SET count=(SELECT count FROM (SELECT count FROM url WHERE origin_url='${origin}')cnt)+1 WHERE origin_url='${origin}'`;
    try{
        const result = await pool.queryParam(query);
        // console.log('update count -> ', result);
        return result.affectedRows;
    }catch(err) {
        console.log('ERROR : ', err);
        throw err;
    }
}