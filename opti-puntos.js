class OptiPunto extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.listaPuntos = [];
    this.listadoUniones = [];
    this.puntoSeleccionado = null;
    this.unepunto1 = null;
    this.unepunto2 = null;

    this.transparencia = "20";
    this.strokeStyleColor = "#161514ff";
    this.colorRelleno = "#e97608";
    this.letterColor = "#0c6ee2";
    this.r = 25;
    this.MlineWidth = 2;

    this.img = new Image();
    this.nameImg = "2.jpg"; // podés cambiarlo por un path externo si querés
  }

  connectedCallback() {
    const imagen = this.getAttribute("imagen") || this.nameImg;
    this.nameImg = imagen;

    this.shadowRoot.innerHTML = `
      <style>
        ${this.constructor.styles()}
      </style>
      <canvas id="main-canvas" class="canvasT" width="1190" height="540"></canvas>
      <div id="siguerratones"></div>
      ${this.constructor.menuHTML()}
      ${this.constructor.configModalHTML()}
      ${this.constructor.infoModalHTML()}
    `;

    this.initComponent();
  }

  static styles() {
    return `
    .canvasT {
      background-color: rgb(239, 21, 21);
      cursor: default;
    }

    * {
      margin: 0;
      padding: 0;
    }

    body {
      cursor: default;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      min-height: 100vh;
      background: linear-gradient(135deg, #8B55E9 0%, #5D6BE6 100%);
    }

   
/* Fondo modal: negro con opacidad al 50% */
.modal {
  display: none; /* Por defecto, estará oculto */
  position: fixed; /* Posición fija */
  z-index: 1; /* Se situará por encima de otros elementos de la página*/
  padding-top: 10px; /* El contenido estará situado a 100px de la parte superior */
  left: 0;
  top: 0;
  width: 100%; /*Ancho completo */
  height: 100%; /* Algura completa */
  overflow: auto; /* Se activará el scroll si es necesario */
  background-color: rgba(0,0,0,0.5); /* Color negro con opacidad del 50% */
  cursor: default;
}

/* Ventana o caja modal */
.contenido-modal {
  position: relative; /*Relativo con respecto al contenedor -modal-*/
  background-color: white;
  margin: auto; /* Centrada */
  padding: 20px;
  width: 500px;
  -webkit-animation-name: animarsuperior;
  -webkit-animation-duration: 0.7s;
  animation-name: animarsuperior;
  animation-duration: 0.5s
}

.contenido-modal1 {
  position: relative; /*Relativo con respecto al contenedor -modal-*/
  background-color: white;
  margin: auto; /* Centrada */
  padding: 20px;
  width: 500px;
  -webkit-animation-name: animarsuperior;
  -webkit-animation-duration: 0.7s;
  animation-name: animarsuperior;
  animation-duration: 0.5s
}

/* Animación */
/* @-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
} */

@keyframes animarsuperior {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* Botón cerrar */
.close {
  color: rgb(11, 11, 11);
  float: right;
  font-size: 20px;
  font-weight: bold;

}

.close:hover,

.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}


    .box {
      display: flex;
      align-items: flex-start;
      width: 100%;
      margin: 6px 0;
    }

    .box1 {
      display: flex;
      justify-content: flex-end;
      margin: 6px 0;
    }

    .labelclase,
    .textoclase {
      width: 100px;
    }

    .textoclase {
      position: relative;
    }

    .bontonclase,
    .bontonclaseS {
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
      user-select: none;
    }

    .bontonclase {
      border: 1px solid #060606;
      border-radius: 4px;
      background: #fff;
    }

    .bontonclaseS {
      border: 1px solid #224;
      background: #fff;
      transition: all 0.5s;
      box-shadow: inset 0 0 0 rgba(0, 0, 0, 1);
    }

    .bontonclaseS:hover {
      color: #fff;
      box-shadow: inset 0 0 0 10rem rgba(34, 34, 65, .68);
    }

    .wrapper {
      position: absolute;
      width: 300px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 12px 35px rgba(0,0,0,0.1);
      visibility: hidden;
      z-index: 99;
    }

    .wrapper .menu {
      padding: 10px 12px;
      list-style: none;
      margin: 0;
    }

    .content .item {
      list-style: none;
      font-size: 22px;
      height: 50px;
      display: flex;
      width: 100%;
      align-items: center;
      border-radius: 5px;
      margin-bottom: 2px;
      padding: 0 5px 0 10px;
    }

    .content .item:hover {
      background: #f2f2f2;
    }

    .content .item span {
      margin-left: 8px;
      font-size: 19px;
    }

    .content .setting {
      display: flex;
      margin-top: -5px;
      padding: 5px 12px;
      border-top: 1px solid #ccc;
    }

    .content .share {
      position: relative;
      justify-content: space-between;
    }

    .share .share-menu {
      position: absolute;
      background: #fff;
      width: 200px;
      right: -200px;
      top: -35px;
      padding: 13px;
      opacity: 0;
      pointer-events: none;
      border-radius: 10px;
      box-shadow: 0 5px 10px rgba(0,0,0,0.08);
      transition: 0.2s ease;
    }

    .share:hover .share-menu {
      opacity: 2;
      pointer-events: auto;
    }

    .cajaTexto {
      display: block;
      height: 300px;
      width: 100%;
      resize: none;
    }

    #siguerratones {
      position: absolute;
      background: black;
      color: orange;
      width: 200px;
      height: 100px;
      display: none;
      border-radius: 10px;
      padding-left: 1%;
      z-index: 120;
    }

    #siguerratones:before {
      content: "";
      position: absolute;
      right: 100%;
      top: 8px;
      width: 0;
      height: 0;
      border-top: 13px solid transparent;
      border-right: 26px solid black;
      border-bottom: 13px solid transparent;
    }

    #siguerratones:hover {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
  }

  static menuHTML() {
    return `
    <div class="wrapper" id="menuContextual">
      <div class="content">
        <ul class="menu">
          <li class="item share">
            <div>
              <i></i>
              <span>Opciones</span>
            </div>
            <ul class="share-menu">
              <li class="item"><i></i><span>Eliminar</span></li>
              <li class="item"><i></i><span>Guardar</span></li>
              <li class="item"><i></i><span>Unir</span></li>
              <li class="item"><i></i><span>DesUnir</span></li>
            </ul>
          </li>
          <li class="item"><i></i><span>Configuracion</span></li>
          <li class="item"><i></i><span>Reiniciar</span></li>
        </ul>
      </div>
    </div>
  `;
  }

  static configModalHTML() {
    return `
    <div id="ventanaModal" class="modal">
      <div class="contenido-modal">
        <span class="close" id="cerrarModal">&times;</span>
        <h2>Puntos</h2>
        <hr><br>
        <p>Configuración:</p><br>

        <div class="box">
          <label class="labelclase">Radio:</label>
          <input id="txtradio" class="textoclase" type="text" placeholder="25">
        </div>

        <div class="box">
          <label class="labelclase">Borde:</label>
          <input id="txtborde" class="textoclase" type="text" placeholder="5">
        </div>

        <div class="box">
          <label class="labelclase">Relleno:</label>
          <input id="Crelleno" type="color" value="#e97608">
        </div>

          <div class="box">
          <label class="labelclase">Transparencia:</label>
          <input type="range" id="RangoT" min="0" max="100" value="50">
        </div>

        <div class="box">
          <label class="labelclase">Borde:</label>
          <input id="Cborde" type="color" value="#e97608">
        </div>

        <div class="box">
          <label class="labelclase">Letra:</label>
          <input id="Cletra" type="color" value="#0c6ee2">
        </div>

      

        <div class="box1">
          <button id="btnAceptarPopUp" class="bontonclaseS">Aceptar</button>
        </div>
      </div>
    </div>
  `;
  }

  static infoModalHTML() {
    return `
      <div id="modalInfo" class="modal">
        <div class="contenido-modal1">
          <span class="close" id="cerrarInfo">&times;</span>
          <h2>Punto</h2>
          <div class="box"><label class="labelclase">ID:</label><label id="infoId" class="labelclase"></label></div>
          <div class="box"><label class="labelclase">Descripción:</label></div>
          <textarea id="infoDesc" class="cajaTexto"></textarea>
          <div class="box1"><button id="btnGuardarInfo" class="bontonclaseS">Guardar</button></div>
        </div>
      </div>`;
  }

  initComponent() {
    this.canvas = this.shadowRoot.querySelector("#main-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.menu = this.shadowRoot.querySelector("#menuContextual");
    this.tooltip = this.shadowRoot.querySelector("#siguerratones").style;
    this.modal = this.shadowRoot.querySelector("#ventanaModal");
    this.modalInfo = this.shadowRoot.querySelector("#modalInfo");

    this.shadowRoot.querySelector("#cerrarModal").onclick = () =>
      (this.modal.style.display = "none");
    this.shadowRoot.querySelector("#cerrarInfo").onclick = () =>
      (this.modalInfo.style.display = "none");
    this.shadowRoot.querySelector("#btnAceptarPopUp").onclick = () =>
      this.applyConfig();
    this.shadowRoot.querySelector("#btnGuardarInfo").onclick = () =>
      this.saveDescription();

    this.canvas.addEventListener("dblclick", (e) => this.handleClick(e));
    this.canvas.addEventListener("contextmenu", (e) => this.openContextMenu(e));
    this.canvas.addEventListener("mousemove", (e) => this.trackMouse(e));
    this.shadowRoot
      .querySelector("#menuContextual")
      .addEventListener("click", (e) => this.handleMenu(e));

    this.img.onload = () => {
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;
      this.ctx.drawImage(this.img, 0, 0);
    };

    this.img.src = this.nameImg;
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let punto = this.listaPuntos.find((p) => {
      return Math.hypot(p.x - x, p.y - y) <= p.radio;
    });

    if (punto) {
      this.puntoSeleccionado = punto;
      this.modalInfo.style.display = "block";
      this.shadowRoot.querySelector("#infoId").textContent = punto.id;
      this.shadowRoot.querySelector("#infoDesc").value =
        punto.descripcion || "";
    } else {
      this.crearPunto(x, y);
    }

    this.menu.style.visibility = "hidden";
    this.tooltip.display = "none";
  }

  crearPunto(x, y) {
    const radio = this.r;
    const borde = this.MlineWidth;
    const color = this.colorRelleno;
    const alpha = this.transparencia;

    const punto = {
      id: this.listaPuntos.length + 1,
      x,
      y,
      radio,
      borde,
      color,
      alpha,
      descripcion: "",
      colorBorde: this.strokeStyleColor, // ✅ NUEVO
    };

    this.listaPuntos.push(punto);
    this.redibujar();
  }

  redibujar() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.img, 0, 0);
    this.listadoUniones.forEach((u) => this.dibujarLinea(u));
    this.listaPuntos.forEach((p) => this.dibujarPunto(p));
  }

  dibujarPunto(p) {
    this.ctx.globalAlpha = p.alpha;

    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.radio, 0, 2 * Math.PI);
    this.ctx.fillStyle = p.color;
    this.ctx.fill();

    this.ctx.lineWidth = p.borde;
    this.ctx.strokeStyle = p.colorBorde || "#000"; // Usa color borde personalizado
    this.ctx.stroke();

    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = p.colorLetra || this.letterColor; // Usa color letra personalizado
    this.ctx.textAlign = "center";
    this.ctx.font = "14px Verdana";
    this.ctx.fillText(p.id, p.x, p.y + 4);
  }

  dibujarLinea(u) {
    this.ctx.beginPath();
    this.ctx.moveTo(u.x1, u.y1);
    this.ctx.lineTo(u.x2, u.y2);
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  openContextMenu(e) {
    e.preventDefault();

    this.tooltip.display = "none";

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.puntoSeleccionado = this.listaPuntos.find(
      (p) => Math.hypot(p.x - x, p.y - y) <= p.radio
    );
    if (!this.puntoSeleccionado) return;

    this.menu.style.left = `${e.clientX}px`;
    this.menu.style.top = `${e.clientY}px`;
    this.menu.style.visibility = "visible";
  }

  trackMouse(evt) {
    const rect = this.canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    const p = this.listaPuntos.find(
      (p) => Math.hypot(p.x - x, p.y - y) <= p.radio
    );
    if (p) {
      this.shadowRoot.querySelector(
        "#siguerratones"
      ).innerHTML = `PUNTO: <b>${p.id}</b><br>Descripción:<br>${p.descripcion}`;
      this.tooltip.left = `${evt.pageX + 30}px`;
      this.tooltip.top = `${evt.pageY - 20}px`;
      this.tooltip.display = "block";
      this.style.cursor = "pointer";
    } else {
      this.tooltip.display = "none";
      this.style.cursor = "default";
    }
  }

  handleMenu(e) {
    const action = e.target.textContent.trim();
    if (!this.puntoSeleccionado) return;

    switch (action) {
      case "Eliminar":
        this.eliminarPunto(this.puntoSeleccionado.id);
        break;
      case "Guardar":
        this.guardarCanvas();
        break;
      case "Unir":
        this.prepararUnion();
        break;
      case "DesUnir":
        this.eliminarUnionesDe(this.puntoSeleccionado.id);
        break;
      case "Configuracion":
        this.shadowRoot.querySelector("#txtradio").value = this.r;
        this.shadowRoot.querySelector("#txtborde").value = this.MlineWidth;
        this.shadowRoot.querySelector("#Crelleno").value = this.colorRelleno;
        this.shadowRoot.querySelector("#Cborde").value = this.strokeStyleColor;
        this.shadowRoot.querySelector("#Cletra").value = this.letterColor;
        this.shadowRoot.querySelector("#RangoT").value = Math.round(
          this.transparencia * 100
        ); // ✅ corregido
        this.modal.style.display = "block";
        break;

      case "Reiniciar":
        this.canvas.style.cursor = "default";
        this.listaPuntos = [];
        this.listadoUniones = [];
        this.borrar();
        this.trazar();
        break;
    }

    this.menu.style.visibility = "hidden";
    this.redibujar();
  }

  handleMenu2(e) {
    const action = e.target.textContent.trim();

    // Si no hay punto seleccionado y no es Configuracion o Reiniciar, salir
    if (
      !this.puntoSeleccionado &&
      action !== "Configuracion" &&
      action !== "Reiniciar"
    )
      return;

    switch (action) {
      case "Eliminar":
        this.eliminarPunto(this.puntoSeleccionado.id);
        this.eliminarUnionesDe(this.puntoSeleccionado.id);
        this.redibujar();
        break;

      case "Guardar":
        this.guardarCanvas();
        break;

      case "Unir":
        this.prepararUnion();
        break;

      case "DesUnir":
        this.eliminarUnionesDe(this.puntoSeleccionado.id);
        this.redibujar();
        break;

      case "Configuracion":
        // Cargar estilos actuales en el modal
        this.shadowRoot.querySelector("#txtradio").value = this.r;
        this.shadowRoot.querySelector("#txtborde").value = this.MlineWidth;
        this.shadowRoot.querySelector("#Crelleno").value = this.colorRelleno;
        this.shadowRoot.querySelector("#Cborde").value = this.strokeStyleColor;
        this.shadowRoot.querySelector("#Cletra").value = this.letterColor;
        this.shadowRoot.querySelector("#RangoT").value = this.transparencia;
        this.modal.style.display = "block";
        break;

      case "Reiniciar":
        this.canvas.style.cursor = "default";
        this.listaPuntos = [];
        this.listadoUniones = [];
        this.borrar();
        this.trazar();
        break;
    }

    // Ocultar el menú contextual al final
    this.menu.style.visibility = "hidden";
  }

  prepararUnion() {
    if (!this.unepunto1) {
      this.unepunto1 = this.puntoSeleccionado;
    } else {
      this.unepunto2 = this.puntoSeleccionado;
      if (this.unepunto1 !== this.unepunto2) {
        const union = {
          x1: this.unepunto1.x,
          y1: this.unepunto1.y,
          x2: this.unepunto2.x,
          y2: this.unepunto2.y,
        };
        this.listadoUniones.push(union);
      }
      this.unepunto1 = null;
      this.unepunto2 = null;
    }
  }

  applyConfig1() {
    if (!this.puntoSeleccionado) return;
    const radio = parseInt(this.shadowRoot.querySelector("#txtradio").value);
    const borde = parseInt(this.shadowRoot.querySelector("#txtborde").value);
    const color = this.shadowRoot.querySelector("#Crelleno").value;
    const alpha =
      parseInt(this.shadowRoot.querySelector("#RangoT").value) / 100;

    if (!isNaN(radio)) this.puntoSeleccionado.radio = radio;
    if (!isNaN(borde)) this.puntoSeleccionado.borde = borde;
    if (color) this.puntoSeleccionado.color = color;
    if (!isNaN(alpha)) this.puntoSeleccionado.alpha = alpha;

    this.redibujar();
    this.modal.style.display = "none";
  }

  applyConfig() {
    if (!this.puntoSeleccionado) return;

    const radio = parseInt(this.shadowRoot.querySelector("#txtradio").value);
    const borde = parseInt(this.shadowRoot.querySelector("#txtborde").value);
    const color = this.shadowRoot.querySelector("#Crelleno").value;
    const alpha =
      parseInt(this.shadowRoot.querySelector("#RangoT").value) / 100;
    const colorBorde = this.shadowRoot.querySelector("#Cborde").value;
    const colorLetra = this.shadowRoot.querySelector("#Cletra").value;

    // Aplicar al punto seleccionado
    if (!isNaN(radio)) this.puntoSeleccionado.radio = radio;
    if (!isNaN(borde)) this.puntoSeleccionado.borde = borde;
    if (color) this.puntoSeleccionado.color = color;
    if (!isNaN(alpha)) this.puntoSeleccionado.alpha = alpha;
    if (colorBorde) this.puntoSeleccionado.colorBorde = colorBorde;
    if (colorLetra) this.puntoSeleccionado.colorLetra = colorLetra;

    // Guardar también como estilo global para nuevos puntos
    this.r = radio;
    this.MlineWidth = borde;
    this.colorRelleno = color;
    this.transparencia = alpha;
    this.strokeStyleColor = colorBorde;
    this.letterColor = colorLetra;

    this.redibujar();
    this.modal.style.display = "none";
  }

  saveDescription() {
    const desc = this.shadowRoot.querySelector("#infoDesc").value;
    if (this.puntoSeleccionado) {
      this.puntoSeleccionado.descripcion = desc;
    }
    this.modalInfo.style.display = "none";
    this.redibujar();
  }

  eliminarPunto(id) {
    const punto = this.listaPuntos.find((p) => p.id === id);
    if (!punto) return;

    // Eliminar uniones conectadas a este punto
    this.listadoUniones = this.listadoUniones.filter(
      (u) =>
        !(u.x1 === punto.x && u.y1 === punto.y) &&
        !(u.x2 === punto.x && u.y2 === punto.y)
    );

    // Eliminar el punto
    this.listaPuntos = this.listaPuntos.filter((p) => p.id !== id);
  }

  eliminarUnionesDe(id) {
    const punto = this.listaPuntos.find((p) => p.id === id);
    if (!punto) return;

    this.listadoUniones = this.listadoUniones.filter(
      (u) =>
        !(u.x1 === punto.x && u.y1 === punto.y) &&
        !(u.x2 === punto.x && u.y2 === punto.y)
    );
  }

  matchPunto(x, y, id) {
    const punto = this.listaPuntos.find((p) => p.id === id);
    if (!punto) return false;
    return punto.x === x && punto.y === y;
  }

  guardarCanvas() {
    const enlace = document.createElement("a");
    enlace.download = "PUNTO.jpg";
    enlace.href = this.canvas.toDataURL("image/jpeg", 1.0);
    enlace.click();

    const contenido = this.listaPuntos
      .map((p) => {
        return `PUNTO:${p.id}\nX:${p.x}\nY:${p.y}\nDESCRIPCION:${p.descripcion}\n`;
      })
      .join("\n");

    const blob = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a2 = document.createElement("a");
    a2.href = url;
    a2.download = "PUNTO.txt";
    a2.click();
    URL.revokeObjectURL(url);
  }

  borrar() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  trazar() {
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
  }
}

customElements.define("opti-punto", OptiPunto);
