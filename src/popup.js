const template = document.createElement('template');

template.innerHTML = `
  <style>

  div{
    padding: 5px 20px 5px 0px;
    border: 1px solid #ccc;
    display: inline-block;
    width: max-content;
    text-align: center;
    margin: auto;
    margin-top: 40px;
    font-weight: bold;
    font-family: Helvetica;
    background-color: white;
  }

  button{
    padding: 4px;
    color: black;
    width: 200px;
    height: 30px;
    font-weight: bold;
    font-family: Lato;
    background-color: rgb(131, 177, 226);;
    border: 1px solid #000;
    border-radius: 10px;
    cursor: pointer;
  }

  </style>

  <button></button>
  <div c>
    <ul>
      <slot name="item">
        Add a link 
      </slot>
    </ul>
  </div>
`;

export class XPopup extends HTMLElement{

  static get observedAttributes(){
    return ['title']
  }

  get title(){
    return this._title;
  }

  set title(value){
    this._title = value;
    this.buttonElement.innerText = this._title;
  }

  constructor(){
    super();
    this._title = '(Not So) Secret Message!';
    // this._message = 'IHTFP';
    this.show = false;
    this.attachShadow({mode:'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    // const div = document.querySelector('#options');

    // // get all children
    // const childern = div.childNodes;

    // // iterate over all child nodes
    // childern.forEach(li => {
    //     console.log(li.innerText);
    // });


    this.buttonElement = this.shadowRoot.querySelector('button');
    this.buttonElement.innerHTML = this.title;

    this.buttonElement.addEventListener("click", () => this.toggle());

    this.contentElement = this.shadowRoot.querySelector('div')
    this.contentElement.style.display = 'none';
  }
  
  attributeChangedCallback(attrName, oldValue, newValue){
    if(attrName === 'title' && oldValue!==newValue){
      this.title = newValue;
    }
  }

  toggle(){
    this.show = !this.show;
    this.contentElement.style.display = this.show ? 'block' : 'none';
    this.dispatchEvent(new CustomEvent('showChange', { detail: this.show}))
  }
}

window.customElements.define('x-popup', XPopup);