import {useEffect} from 'react';

var hist;
var loc;

function setHistory(setHist) {
  hist = setHist;
  loc = hist.location.pathname;
}

function Nav(){
  useEffect(onMount, []);
  
  function onMount() {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  };
  
  function onKeyDown({key}) {
    if (key === "ArrowRight"){
      hist.push(setPath("next"));
    }
    if (key === "ArrowLeft"){
      hist.push(setPath("previous"));
    }
    if (key === "Escape"){
      hist.push(setPath("dash"));
    }
    if (key ==="Enter"){
      hist.push(setPath("dash"));
    }
  }
}

function setPath(direction) {
  if(direction==="next"){
    switch(loc){
      case "/gestao": {return("./entendimento");} break;
      case "/entendimento": {return("./celeridade");} break;
      case "/celeridade": {return("./atuacao");} break;
      case "/atuacao": {return("./dashboard");} break;
    }
  }
  else if(direction==="previous"){
    switch(loc){
      case "/gestao": {return("./gestao");} break;
      case "/entendimento": {return("./gestao");} break;
      case "/celeridade": {return("./entendimento");} break;
      case "/atuacao": {return("./celeridade");} break;
    }
  }
  else if(direction==="dash"){
    return("./dashboard");
  }
  else return(loc);
  /*
  if(path===0){
    path=null;
  }
  else if(path===1){
    path="./gestao";
    hist.push(path);
  }
  else if(path===2){
    path="./entendimento";
    hist.push(path);
  }
  else if(path===3){
    path="./celeridade";
    hist.push(path);
  }
  else if(path===4){
    path="./atuacao";
    hist.push(path);
  }
  else if(path===5){
    path="./dashboard";
    hist.push(path);
  }*/
}

export {
  setHistory,
  Nav,
  setPath
};