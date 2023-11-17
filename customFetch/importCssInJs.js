import styles from "./style.css" assert { type: "css" };
document.adoptedStyleSheets = [styles];
document.addEventListener('DOMContentLoaded', function () {
    const h1Element = document.getElementById("myh2");
    console.log("element",h1Element,styles)
    h1Element.classList.add('heading');
  });

// in module bundler these type syntax is taken care by webpack by css-loader and style-loader
// import  "./style.css" 
// document.addEventListener('DOMContentLoaded', function () {
//     const h1Element = document.getElementById("myh2");
//     console.log("element",h1Element,styles)
//     h1Element.classList.add('heading');
//   });

  (function hello(){
    console.log("hello")
  })()


