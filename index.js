'use strict'

const axios = require('axios').default;

const api = axios.create({
    baseURL: 'https://stats.fn.sportradar.com/',
    Headers: {
        // ':authority': 's5.sir.sportradar.com',
        // ':method': 'GET',
        // ':path': '/bet365',
        // ':scheme': 'https',
        // 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        // 'accept-encoding': 'gzip, deflate, br',
        // 'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        // 'cache-control':'max-age=0',
        // //'if-modified-since': 'Fri, 03 Jul 2020 00:29:17 GMT'
        // 'if-none-match': 'W/"3ecfc-n3fFudoR6Xtku0/SWzNijJYGr2E"',
        // 'sec-fetch-dest': 'document',
        // 'sec-fetch-mode': 'navigate',
        // 'sec-fetch-site': 'none',
        // 'sec-fetch-user': '?1',
        // 'upgrade-insecure-requests': 1,
        // 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        'accept-ranges': 'bytes',
        age: 131412,
        'cache-control': 'public, max-age=2592000, immutable',
        'content-encoding': 'gzip',
        'content-length': 7074,
        'content-type': 'application/json; charset=UTF-8',
        //date: Date(),
        etag: 'W/"57ee-17309d912c9"',
        //'last-modified': Wed, 01 Jul 2020 10:08:07 GMT
        server: 'nginx / 1.10.3',
        status: 304,
        vary: 'Accept-Encoding',
        via: '1.1 varnish-v4',
        via: '1.1 varnish (Varnish/5.2)',
        'x-powered-by': 'Express',
        'x-sbe': 'sir_prod_s5_web2',
        'x-srv': 's5-prod-nov1-fvauto-0b3a4823a989f594e',
        'x-varnish': 685861853,
        'x-varnish': '560763680 557848140'
    }
})

class sportApi {
    constructor(bettingHouse) {
        this.bettingHouse = bettingHouse;
    }

    allDefinitions() {
        return new Promise((resolve, reject) => {
            api.get(`https://s5.sir.sportradar.com/translations/common/en.5bc333c9e86aeb31125b4b35e9038eb5.json`).then((all) => {
                resolve(all.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    modalData(sportId, method) {
        return new Promise((resolve, reject) => {
            api.get(`${this.bettingHouse}/en/Europe:Berlin/gismo/config_tree_mini/41/0/${sportId}`).then((sport) => {
                if (method == 'all') {
                    resolve(sport.data)
                }
                if (method == 'categories') {
                    resolve(sport.data.doc[0].data[0])
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }

    localData(sportId, localId, method) {
        return new Promise((resolve, reject) => {
            api.get(`${this.bettingHouse}/en/Europe:Berlin/gismo/config_tree_mini/41/0/${sportId}/${localId}`).then((sport) => {
                if (method == 'all') {
                    resolve(sport.data)
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }

    liague(ligueId) {
        return new Promise((resolve, reject) => {
            api.get(`${this.bettingHouse}/en/America:Argentina:Buenos_Aires/gismo/stats_season_meta/${ligueId}`).then((ligue) => {
                resolve(ligue.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    liagueSummary(ligueId) {
        return new Promise((resolve, reject) => {
            api.get(`common/en/Europe:Berlin/gismo/stats_season_leaguesummary/${ligueId}/main`).then((ligue) => {
                resolve(ligue.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    seasonGoals(leagueId) {
        return new Promise((resolve, reject) => {
            api.get(`${this.bettingHouse}/en/America:Argentina:Buenos_Aires/gismo/stats_season_goals/${leagueId}/main`).then((ligue) => {
                resolve(ligue.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    leagueFixtures(liagueId) {
        return new Promise((resolve, reject) => {
            api.get(`${this.bettingHouse}/en/America:Argentina:Buenos_Aires/gismo/stats_season_fixtures2/${liagueId}/1`).then((ligue) => {
                resolve(ligue.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

class sportData {
    constructor(bettingHouse, configs) {
        this.configs = configs;
        this.bettingHouse = bettingHouse;
    }

    getInfo(region, method, values) {
        return new Promise((resolve, reject) => {
            if (this.configs.getCommonContents == true) {
                if (method == 'common') {
                    api.get(`https://s5.sir.sportradar.com/translations/common/en.5bc333c9e86aeb31125b4b35e9038eb5.json`).then((all) => {
                        resolve(all.data)
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    resolve({ contents: null, status: 'Err', mensage: 'method Is invalid' })
                }
            } else {
                api.get(`${this.bettingHouse}/en/${region}/gismo/${method}/${values}`).then((data) => {
                    resolve(data.data.doc[0])
                }).catch((err) => {
                    reject(err)
                })
            }
        })
    }
}


module.exports = (sportData);