import fetch from 'node-fetch'
import fs from 'fs'

let url = "https://plancke.io/hypixel/leaderboards/raw.php?type=player.blitz.overall"

let data = await fetch(url)

let body = await data.json()

let status = data?.status
let result = body?.result


if (!status == 200) console.log("An Error Occured")

let rawHref = ""

let hrefRegexp = new RegExp('href=\\".*?"','g')
let hrefMatches = result.matchAll(hrefRegexp)

for (let href of hrefMatches) {
    rawHref += href[0]
}


let rawIgn = rawHref.replace(/href="\/hypixel\/player\/stats\//g, "").replace(/"/g, " ").replace(/\s+\S*$/, "")


let rawUsernames = rawIgn.split(' ')
let usernames = JSON.stringify(rawUsernames, null, 1)


fs.writeFile("usernames.json", usernames, "utf-8", (err) => {
    if (err) {
        console.log(err)
    }
})