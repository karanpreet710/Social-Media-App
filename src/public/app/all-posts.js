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

function myFunction2(id) {
  var list = document.getElementById(`show${id}`)
  var anch = document.getElementById(`anch${id}`)
  if (list.style.display === "none") {
    list.style.display = "block"
    $(`#show${id}`).empty()
    $.get(`/api/posts/comments?postId=${id}`, (comments) => {
      for (let c of comments) {
        $(`#show${id}`).append($(`<li style="list-style:none;">
        <span class="font-weight-bold">${c.user.username}</span>&nbsp;&nbsp;
        <span>${c.body}</span>&nbsp;&nbsp;&nbsp;
        </li>`));
      }
    })
    anch.innerHTML = "Hide Comments"
  }
  else {
    list.style.display = "none"
    anch.innerHTML = "Show Comments"
  }
}

function myFunction1(pid) {
  var likeBtn = document.getElementById(`like${pid}`)
  const uid = JSON.parse(window.localStorage.user).id;
  $.get(`/api/posts/likes?postId=${pid}&userId=${uid}`, (likes) => {
    if (likes.length == 0) {
      $.post('/api/posts/likes', { pid, uid }, (data) => {
        let cnt = parseInt(likeBtn.innerText)
        cnt = cnt + 1
        likeBtn.innerText = cnt
      })
    }
    //console.log(likes.length)
  })
}

function postFunction(pid){
  const uid = JSON.parse(window.localStorage.user).id;
  const body = $(`#comm-body${pid}`).val()
  $.post('/api/posts/comments', { body, pid, uid }, (data) => {
    $(`#post${pid}`).empty()
  })
}

function myFunction3(pid) {
  var temp=document.getElementById(`post${pid}`)
  if(temp.style.display==="none")
  {
    temp.style.display="block"
    $(`#post${pid}`).empty()
      $(`#post${pid}`).append($(`
        <form>
          <div class="form-group row">
            <div class="col-xs-4 ml-2">
              <input type="text" class="form-control" id="comm-body${pid}" placeholder="Write your comment here.....">
            </div>
            <div class="ml-2">
              <button onclick="postFunction(${pid})" id="write-btn" class="btn btn-primary">Post</button>
            </div>
          </div>
        </form>
    `))
  }
  else
  {
    temp.style.display="none"
  }
}

function loadPosts() {
  $.get('/api/posts', (posts) => {
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
                <a href="#foo" class="card-link" onclick="myFunction3(${p.id})">Comment</a>
                <a href="#foo" class="card-link" onclick="myFunction1(${p.id})">Like</a>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;❤️</span>
                <span id="like${p.id}">${cnt}</span>
                <br>
                <br>
                <a id="anch${p.id}" href="#foo" class="card-link" onclick="myFunction2(${p.id})">Show Comments</a>
                <ul id="show${p.id}" style="display:none;" class="list-group">
                </ul>
                <div id="post${p.id}" style="display:none;">
                </div>
              </div>
            </div>
          </div> 
          `)
        )
      })
    }
  })
}
