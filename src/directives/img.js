const default_img_url = ''

export default function init(app) {
    app.directive('fail-img', {
        // 当被绑定的元素插入到 DOM 中时……
        mounted(el, binding) {
            let url = binding.value || default_img_url
            el.addEventListener('error', function () {
                el.src = url
            })
        }
    })
    app.directive('avatar-img', {
        // 当被绑定的元素插入到 DOM 中时……
        mounted(el, binding) {
            let url = binding.value || default_img_url
            el.addEventListener('error', function () {
                el.src = url
            })
        }
    })

// `v-fail-img-bg` //当以背景图形式加载图片时，设置加载失败的默认背景图
    /*
      Usage:  Vue 自定义指令
      Author: songle
      Time:   2018-11-21
    */

    app.directive('fail-img-bg', {
        // 当被绑定的元素插入到 DOM 中时……
        mounted(el, binding) {
            let url = default_img_url
            switch (binding.value) {
                case 1:
                    url = ''
                    break
                case 2:
                    url = ''
                    break
                case 3:
                    url = ''
                    break
            }
            let img = new Image()

            let isHas = el.style.backgroundImage[4] === '"'
            let bgUrl = el.style.backgroundImage.substring(isHas ? 5 : 4, el.style.backgroundImage.length - (isHas ? 2 : 1))
            img.src = bgUrl
            img.onload = function () {
                el.__loadImg = true
            }
            if (!el.__loadImg) {
                img.onerror = function () {
                    setTimeout(function () {
                        console.log('error load img:', bgUrl)
                        el.style.background = 'url(' + url + ')'
                        el.style.backgroundSize = 'cover'
                        el.style.backgroundRepeat = 'no-repeat'
                        el.style.backgroundPosition = 'center'
                    }, 300)
                }
            }
        }
    })

    app.directive('fail-photo-bg', {
        // 当被绑定的元素插入到 DOM 中时……
        mounted(el, binding) {
            let url = default_img_url
            if (binding.value.faceimg && binding.value.faceimg != url) {
                let img = new Image()
                img.onload = function () {
                    el.__isloadImg = true
                }
                if (!el.__isloadImg) {
                    img.onerror = function () {
                        setTimeout(function () {
                            console.log('error load img:', bgUrl)
                            el.style.background = 'url(' + binding.value.faceimg + ')'
                            el.style.backgroundSize = 'cover'
                            el.style.backgroundRepeat = 'no-repeat'
                            el.style.backgroundPosition = 'center'
                        }, 300)
                    }
                }
            } else if (binding.value.child_name) {
                el.innerHTML = binding.value.child_name.toString().substr(0, 1)
                el.style.background = '#ffede6'
                el.style.fontSize = '1.86rem'
                el.style.color = '#fe9700'
                el.style.display = 'flex'
                el.style.justifyContent = 'center'
                el.style.alignItems = 'center'
            } else {
                el.innerHTML = binding.value.nickname.toString().substr(0, 1)
                el.style.background = '#ffede6'
                el.style.fontSize = '1.86rem'
                el.style.color = '#fe9700'
                el.style.display = 'flex'
                el.style.justifyContent = 'center'
                el.style.alignItems = 'center'
            }
        }
    })
}
