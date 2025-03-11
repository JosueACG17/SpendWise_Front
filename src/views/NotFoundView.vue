<template>
  <div class="not-found">
    <div class="error-message">
      <span class="number">4</span>
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Bitcoin.png" alt="Bitcoin Logo" class="bitcoin-logo" />
      <span class="number">4</span>
    </div>
    <p class="oops-message">Pagina no encontrada</p>
    <p class="text-xl md:text-2xl font-semibold leading-normal text-white">
      Lo siento, te haz perdido
    </p>
    <div class="buttons">
      <router-link to="/" class="button">Regresar</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("https://img.freepik.com/vector-gratis/fondos-negros-degradados-marcos-dorados_23-2149150610.jpg?semt=ais_hybrid");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: yellow;
  text-align: center;
  position: relative;
  image-rendering: auto;
}

.error-message {
  font-size: 80px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.number {
  font-size: 150px;
  margin: 0 10px;
}

.bitcoin-logo {
  width: 140px;
  height: 135px;
  filter: drop-shadow(0 0 10px yellow);
}

.oops-message {
  font-size: 30px;
}

.buttons {
  margin-top: 30px;
}

.button {
  padding: 10px 20px;
  background-color: yellow;
  color: black;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  margin: 10px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #ffd700;
}
</style>
