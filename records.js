(function(){
  var shelf=document.getElementById('shelf');
  var open=null, player=null;
  function embed(r){
    if(r.bc) return {src:'https://bandcamp.com/EmbeddedPlayer/album='+r.bc+'/size=large/bgcol=000000/linkcol=ff1a1a/tracklist=true/artwork=none/transparent=true/',h:r.tracks>1?Math.min(120+r.tracks*33,470):120};
    return {src:'https://open.spotify.com/embed/album/'+r.sp,h:352};
  }
  function close(){ if(open){open.classList.remove('playing');open.setAttribute('aria-pressed','false');} if(player){player.remove();player=null;} open=null; }
  RECORDS.forEach(function(r){
    var b=document.createElement('button');
    b.className='rec';b.type='button';b.setAttribute('aria-pressed','false');b.setAttribute('aria-label','Play '+r.title);
    b.innerHTML='<div class="vinyl"><div class="label"><img src="'+r.cover+'" alt="" loading="lazy"></div></div><h3>'+r.title+'</h3><div class="meta">'+r.type+'</div>';
    b.addEventListener('click',function(){
      if(open===b){close();return;}
      close(); open=b; b.classList.add('playing'); b.setAttribute('aria-pressed','true');
      var e=embed(r); player=document.createElement('div'); player.className='player';
      player.innerHTML='<iframe src="'+e.src+'" style="height:'+e.h+'px" allow="autoplay; encrypted-media" loading="lazy" title="'+r.title+' player"></iframe>';
      // insert after the last record in the same row
      var next=b, top=b.offsetTop;
      while(next.nextElementSibling && next.nextElementSibling.offsetTop===top) next=next.nextElementSibling;
      next.after(player);
    });
    shelf.appendChild(b);
  });
  var m=location.hash.match(/play=(\d+)/); if(m&&shelf.children[+m[1]]) shelf.children[+m[1]].click();
})();
