// ნავიგაციის ჰენდლერი
const navigationBar = document.querySelector('#navigation_bar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navigationBar.classList.add('bg-transparent');
  } else {
    navigationBar.classList.remove('bg-transparent');
  }
})

//sideNavigationის ჰენდლერი 
const sideNavBtn = document.querySelector('button.nav-btn');

const NavBtnClickDelay = () => {
  sideNavBtn.disabled = true;

  setTimeout(() => {
    sideNavBtn.disabled = false;
  }, 500);
}

//overlayს ჰენდლერი
const overlayEl = document.querySelector('.overlay');
const clickEvent = new Event('click');

overlayEl.addEventListener('click', () => {
  sideNavBtn.dispatchEvent(clickEvent);
})

sideNavBtn.addEventListener('click', () => {
  if (sideNavBtn.classList.contains('toggled')) {
    const sideNav = document.querySelector('nav:has(button.toggled) .nav-links');
    sideNav.classList.add('hideSideNav');

    setTimeout(() => {
      sideNavBtn.classList.remove('toggled');
      sideNav.classList.remove('hideSideNav');
    }, 300)
  }
  else
    sideNavBtn.classList.toggle('toggled');

  NavBtnClickDelay()
})

//კურსების დამატება კონტეინერში
const coursesContainer = document.querySelector('#courses-container');
const courses = [
  {
    title: 'iOS Development',
    route: 'ios-development'
  },
  {
    title: 'React',
    route: 'react'
  },
  {
    title: 'Intro to Python',
    route: 'python-basic'
  },
  {
    title: 'Advanced Python',
    route: 'python-advance'
  },
  {
    title: 'Advanced Cybersecurity Course',
    route: 'information-security-advance'
  },
  {
    title: 'ToT - Training of Trainers',
    route: 'training-of-trainers'
  },
  {
    title: 'Blockchain',
    route: 'blockchain'
  },
  {
    title: 'DevOps',
    route: 'devops'
  },
  {
    title: 'Information Security Governance',
    route: 'information-security-basic'
  }
];

//გამოყენებულია innerHTML რადგან courses-item ელემენტი მარტივია და სტრუქტურით ყველა ერთმანეთის იდენტური 
for (let c of courses) {
  coursesContainer.innerHTML += `
    <div class="courses-item">
      <img src="./assets/course-items/courses-${c.route}.webp" alt="${c.title}">
      <div class="item-info">
        <span> ${c.title} </span> <br> <br>
          <span> რეგისტრაცია დასრულებულია </span>
      </div>
      <a href="https://www.tbcacademy.ge/usaid/${c.route}">
        <svg viewBox="1.833 2.667 13.334 10.666" height="16" width="17">
          <path fill="#0493c9"
            d="m10.3 2.867 4.667 4.666a.645.645 0 0 1 0 .934L10.3 13.133a.644.644 0 0 1-.933 0 .644.644 0 0 1 0-.933L12.9 8.667H2.5c-.4 0-.667-.267-.667-.667s.267-.667.667-.667h10.4L9.367 3.8a.605.605 0 0 1-.2-.467c0-.2.066-.333.2-.466a.644.644 0 0 1 .933 0Z">
          </path>
        </svg>
        <span>კურსის დეტალები</span>
      </a>
    </div>
  `;
}

//პარტნიორების სექცია (სლაიდერი)
const partnersSlider = document.querySelector('.partners-slider');

let p = 0;
const changeLogos = (p) => {
  //წინა ლოგოების დამალვა
  const prevLogos = partnersSlider.firstElementChild;
  prevLogos.classList.add('hide');
  prevLogos.classList.remove('show');

  setTimeout(() => {
    partnersSlider.removeChild(prevLogos);
  }, 1300);

  //ახალი ლოგოების გამოტანა
  const newPartnersLogos = document.createElement('div');
  newPartnersLogos.classList.add('partners-logos');
  newPartnersLogos.classList.add('show');

  //img ელემენტების დინამიურად შექმნა და მშობელ ელემენტში ჩამატება
  for (let i = p * 3; i < p * 3 + 3; ++i) {
    const imgEl = document.createElement('img');
    if (i === 6)
      imgEl.classList.add('centered');
    if (i < 7) {
      imgEl.src = `./assets/partners-logos/partners-logo-${i + 1}.webp`;
      newPartnersLogos.append(imgEl);
    }
  }

  partnersSlider.prepend(newPartnersLogos);
  // console.log(p);
}

//1 წამიანი ინტერვალი ღილაკის დაკლიკვიდან შემდეგ დაკლიკვამდე
const clickDelay = () => {
  const sliderBtns = document.querySelectorAll('.partners-content button');

  sliderBtns.forEach(btn => btn.disabled = true);

  setTimeout(() => {
    sliderBtns.forEach(btn => btn.disabled = false);
  }, 1000);
}

//ტაიმერი ლოგოების ავტომატური ცვლილებისთვის
let sliderInterval;
const setSliderInterval = () => {
  sliderInterval = setInterval(() => {
    if (p == 2)
      p = 0;
    else
      p++;
    changeLogos(p);
  }, 3000)
}

setSliderInterval();

//hover ევენთზე ტაიმერის გათიშვა/ჩართვა:
const partnersSection = document.querySelector('section#partners');

partnersSection.addEventListener('mouseenter', () => {
  clearInterval(sliderInterval);
})

partnersSection.addEventListener('mouseleave', () => {
  setSliderInterval();
})

//სლაიდერის ღილაკები
const partnersContent = document.querySelector('.partners-content');
partnersContent.addEventListener('click', (e) => {

  if (e.target.id === 'arrow-right') {
    if (p == 2) p = 0;
    else p++;
  }
  else if (e.target.id === 'arrow-left') {
    if (p == 0) p = 2;
    else p--;
  }
  else if (e.target.id === 'slider-btn-0')
    p = 0;
  else if (e.target.id === 'slider-btn-1')
    p = 1;
  else if (e.target.id === 'slider-btn-2')
    p = 2;

  changeLogos(p);
  clickDelay();
})

//ხშირად დასმული კითხვები
const questionsList = document.querySelectorAll('.faq-container li');
const answerDivs = document.querySelectorAll('.faq-container li div')

questionsList.forEach((item) => {
  const [btn, answerContainer] = item.children;

  btn.addEventListener('click', () => {
    answerDivs.forEach(ans => ans.id !== answerContainer.id && ans.classList.remove('show-answer'));
    answerContainer.classList.toggle('show-answer');
  })
})



