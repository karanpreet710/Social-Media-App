function myFunction(id) {
  var dots = document.getElementById(`dots${id}`);
  var moreText = document.getElementById(`more${id}`);
  var btnText = document.getElementById(`myBtn${id}`);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "read less";
    moreText.style.display = "inline";
  }
}

function myFunction1(pid){
  var likeBtn = document.getElementById(`like${pid}`)
  const uid = JSON.parse(window.localStorage.user).id;
  $.get(`/api/posts/likes?postId=${pid}&userId=${uid}`, (likes) => {
    if(likes.length==0)
    {
      $.post('/api/posts/likes', { pid,uid }, (data) => {
        let cnt=parseInt(likeBtn.innerText)
        cnt=cnt+1
        likeBtn.innerText=cnt
      })
    }
    //console.log(likes.length)
  })
}

function loadMyPosts() {
  const userId = JSON.parse(window.localStorage.user).id;
  $.get(`/api/posts?userId=${userId}`, (posts) => {
    for (let p of posts) {
      var cnt = 0;
      $.get(`/api/posts/likes?postId=${p.id}`, (likes) => {
        cnt = likes.length
        $('#posts-container').append(
          $(`
          <div class="col-4">
            <div class="card m-2">
              <div class="card-body">
                <h5 class="card-title">${p.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${p.user.username}</h6>
                <p class="card-text">
                  ${p.body.substr(0, 200)}<span id="dots${p.id}">...</span><span id="more${p.id}" style="display:none;">${p.body.substr(200)}</span>
                  <a href="#foo" id="myBtn${p.id}" onclick="myFunction(${p.id})">read more</a>
                </p>
                <a href="#" class="card-link">Comment</a>
                <a href="#foo" class="card-link" onclick="myFunction1(${p.id})">Like</a>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;❤️${cnt}</span>
              </div>
            </div>
          </div> 
          `)
        )
      })
    }
  })
}
