gsap.registerPlugin(ScrollTrigger)
const lenis = new Lenis()
lenis.on('scroll', (e) => {
  console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

///////////////////////////////////

// badge : badge 클래스를 가진 모든 요소들에게 설정할 수 있다.
gsap.to(".badge", {
  rotation: 360,
  duration: 5,
  ease: "none",
  repeat: -1
})

///////////////////////////////////

// 얼굴
let wrapper = document.querySelector(".tracker") // : 얼굴을 감싸는 모든 영역
let emoji = document.querySelector(".emoji")
let emojiFace = document.querySelector(".emoji-face")

let moveEvent = function (e) {
  let wrapperRect = wrapper.getBoundingClientRect(); // wrapper에대한 공간 정보
  console.log(wrapperRect)

  let relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2)
  let relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2)

  let emojiMaxDisplacement = 50;
  let emojiFaceMaxDisplacement = 75; // 움직임의 최대 값

  let emojiFaceDisplacementX = (relX / wrapperRect.width) * emojiFaceMaxDisplacement
  let emojiFaceDisplacementY = (relY / wrapperRect.height) * emojiFaceMaxDisplacement

  let emojiMaxDisplacementX = (relX / wrapperRect.width) * emojiMaxDisplacement
  let emojiMaxDisplacementY = (relY / wrapperRect.height) * emojiMaxDisplacement
  gsap.to(emojiFace, {
    x: emojiFaceDisplacementX,
    y: emojiFaceDisplacementY,
    duration: 0.35,
    ease: "power3.out"
  })
  gsap.to(emoji, {
    x: emojiFaceDisplacementX,
    y: emojiFaceDisplacementY,
    duration: 0.35,
    ease: "power3.out"
  })
}


// 첫번째 영역

let stickys = document.querySelectorAll(".sticky")
stickys.forEach(function (sticky) {
  gsap.to(sticky, {
    scrollTrigger: {
      trigger: sticky,
      start: "top top",
      end: "+=150%",
      scrub: 1,
    },
    y: 250,
    scale: 0.75,
    rotation: -15,
    ease: "power3.out"
  })
})


// 두번째 영역
let conScales = document.querySelectorAll(".con-scale")
conScales.forEach(function (conScale) {
  gsap.fromTo(conScale, {
    y: 100,
    scale: 0.7,
    rotation: 15
  }, {
    scrollTrigger: {
      trigger: conScale,
      start: "top 80%",
      end: "top 20%",
      scrub: 2,
    },
    y: 0,
    scale: 1,
    duration: 1,
    rotation: 0,
    ease: "power3.out"
  })
})
// 구조 : gsap.fromTo(conScale,{from에 해당},{to에 해당})



// 두번째 영역의 각각의 이미지 애니
let secImgs = document.querySelectorAll('.section-images') // : .section-images 을 모두 불러서 같은 효과
secImgs.forEach(function (secImg) {
  let imgs = secImg.querySelectorAll('img')
  let secImgParent=secImg.parentNode; // : 각각의 부모 태그 부르기

  imgs.forEach(function (img, index) {
    let imgDey = index * 0.8
    gsap.set(img, {
      y: 400
    })
    gsap.timeline({
        scrollTrigger: {
          trigger:secImgParent,
          start: "top 60%",
          end: "top top",
          scrub: 2
        }
      })
      .to(img, {
        y: 0,
        duration: 2,
        delay: imgDey,
        ease: "power3.out"
      })
  })
})

// 세번째 페이지
// 글자 자르기

// const text = new SplitType('#target', { types: 'words, chars' })

let SplitTypes = document.querySelectorAll('.heading-large')

SplitTypes.forEach(function (char, i) {
  let parent = char.parentNode.parentNode;
  const text = new SplitType(char, {
    types: 'chars'
  })
  console.log(text)

  gsap.from(text.chars, {
    opacity: 0,
    yPercent: 100,
    duration: 0.4,
    stagger: 0.04,
    scrollTrigger: {
      trigger: parent,
      start: "top 60%",
      end: "top 20%",
      ease: "power3.out"
    }
  })
})

// 텍스트의 사라지는 방향 애니
gsap.to("[data-direct]", { // 속성중에 [data-direct]이 있는 것들을 모두 다 호출한다. 
  x: (i, el) => -(el.getAttribute("data-direct")) * 400,
  // : el(태그)의 속성을 가진 ata-direct 의 값(html에서 입력한 1 또는 -1의 값)을 불러와라.
  // el은 data-direct 속성을 가지고 있는 요소들을 하나씩 받아온다, i는 그것들의 index.No
  // 앞에 - 를 적는 이유 :: 음수와 양수를 분류하기 위해서이다.
  ease: "none",
  scrollTrigger: {
    trigger: ".text_wrap",
    start: "top 20",
    end: "top top",
    duration: 2,
    scrub: 2
  }
})

// 둥근 얼굴들 애니

gsap.to("[data-speed]", {
  y: (i, el) => (el.getAttribute("data-speed") - 1) * 230,
  ease: "none",
  scrollTrigger: {
    start: 0, // 스크롤 트리거가 시작되는 스크롤의 위치를 잡는다.
    end: "max", // 스크롤 트리거가 끝나는 위치를 알아서 잡는다.
    scrub: 2
  }
})


let rarr = document.querySelectorAll("[data-speed]")

gsap.from(rarr[0], {
  scrollTrigger: {
    trigger: ".website-content2",
    start: "top 100%",
    end: "top top",
    scrub: 2
  },
  rotation: 45
})

gsap.from(rarr[1], {
  scrollTrigger: {
    trigger: ".text-black",
    start: "top 100%",
    end: "top top",
    scrub: 2
  },
  rotation: -45
})

gsap.from(rarr[2], {
  scrollTrigger: {
    trigger: ".website-content2",
    start: "80% 100%",
    end: "bottom top",
    scrub: 2
  },
  rotation: 45
})

// wave
gsap.to(".wave", {
  xPercent: 20,
  scrollTrigger: {
    trigger: ".website-content2",
    start: "90% 100%",
    end: "+=100%",
    scrub: 1,
  }
})


// wrapper.addEventListener("mousemove",function(){moveEvent()})
wrapper.addEventListener("mousemove", moveEvent)