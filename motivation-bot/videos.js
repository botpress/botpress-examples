const axios = require('axios')
const _ = require('lodash')

const videos = {
  WORK: [
    "DNFtCIzJQ7A",
    "g-fGYtagSDY",
    "00rPgc0tISM",
    "qa9G5EdKiRw",
    "3AyH1fBN7ac",
    "HQtZ4kud2qA",
    "puDQoBPpWyQ",
    "A0Scr2TW2ZA",
    "2zzj4CO9xSw",
    "twZgNP8iZBQ",
    "8QlvQC4MXxs",
    "PF54jfEFhIM",
    "CPQ1budJRIQ",
    "_R8gBnhyMSA",
    "350F0VsECvo",
    "KA-6OwyGGfI",
    "Q23Exmnio8s"
  ],
  LIFE: [
    "6tbHYvH347A",
    "6vuetQSwFW8",
    "7_R4AsV2fPI",
    "njQcOKOpFwk",
    "5g0QHTcwP8k",
    "t-H7_aAuiC8",
    "5e338_RFOr8",
    "U3V701IUZ2E",
    "ZkabeHig_r4",
    "FK16iXPRAjI",
    "4pxiU89O1wE",
    "2otRxX6y7mQ",
    "bGc9mXhdMkw",
    "UMF_oJkOZmg",
    "cRMogDrHnMQ",
    "pfWGoLj1JCM",
    "EyhOmBPtGNM",
    "5fOiu0OdpoI",
    "DNITe9snHqA",
    "GtCD6e1fa_I"
  ],
  GYM: [
    "Fh-rCrREEgA",
    "xoXYe9e01_Y",
    "hV63DbQ_qSc",
    "YxzQ6umhH4Q",
    "lsSC2vx7zFQ",
    "aMGoxlXmA0o",
    "at7QvbFy9fM",
    "qapsrR8zIJM",
    "vnMtpNhcDOE",
    "OV6-n5wtCWA",
    "lpVRxa9jsrE",
    "7fSLbC-1b0Q",
    "n_8ZIYxtPvc",
    "j0FFNcIYZMI",
    "R1JBQMXbN2k",
    "B_3pHAhhdM0"
  ]
}

const getYoutubeVideoMetadata = (videoId) => {
  const YOUTUBE_API_KEY = 'AIzaSyAp2kmHzUFdlD1b4N4XR0OhKUWnC_IVaAA'
  const apiUrl = `https://content.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`

  return axios.get(apiUrl)
  .then(res => {
    const video = res.data.items[0].snippet
    return {
      description: video.description,
      thumbnail: (video.thumbnails.high || video.thumbnails.standard).url,
      title: video.title,
      url: 'https://www.youtube.com/embed/' + videoId + '?autoplay=1'
    }
  })
}

module.exports = {
  getRandomVideo: (category) => {
    if (!category) {
      category = _.sample(_.keys(videos))
    }
    
    const videoId = _.sample(videos[category])
    return getYoutubeVideoMetadata(videoId)
  }
}
