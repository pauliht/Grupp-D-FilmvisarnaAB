class Movie extends Base {
  constructor(movieTitle){
    super();
    this.movieObject = this.getMovieObject(movieTitle);
    this.renderMovie();
    this.eventHandlers();

  }

  eventHandlers(){
    let that = this;
    $(document).on('click', '.showtrailer', function(){
      console.log('hej');
      $('.slide').toggleClass('d-none');
      $('.trailer').toggleClass('d-none');
      console.log('hejdå');
      $(this).html(function(i, text){
        return text === `<i class="fa fa-video-camera mr-2" aria-hidden="true"></i>Show slides` ?
        `<i class="fa fa-video-camera mr-2" aria-hidden="true"></i>Show trailer`
        :
        `<i class="fa fa-video-camera mr-2" aria-hidden="true"></i>Show slides`;
      })
    })};

  getActors(movieObject){
  	let actors = "";
  	for(let actor of movieObject.actors){
  		actors += '<li>'+ actor +'</li>';
  	}
  	return actors;
  }

  convertMinutesToHours(movieObject){
    let totalMinutes = movieObject.length;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    return hours + 'h ' + minutes + 'm';
  }

  getAllReviews(movieObject){
    let allReviews = "";
    for(let review of movieObject.reviews){
      allReviews += `<p><strong>&ldquo;${review.quote}&ldquo;</strong><em>- ${review.source}</em></p>`;
    }
    return allReviews;
  }

  renderShowtime(movieObject){
   let allShowTimes = this.getShowObject(movieObject.title);
   let showTimesRendered = '';
   let co = 0;
   for (let showTimeObject of allShowTimes) {
     showTimesRendered += `<li data-movieTime="${co}"><div class="col-4 d-inline-block"><strong>${showTimeObject.date}</strong></div><div class="col-4 d-inline-block">${showTimeObject.auditorium}</div> <div class="col-3 d-inline-block">${showTimeObject.time}</div></li>`
     co++
   }
   return showTimesRendered;
  }

  renderTrailer(movieObject){
    return `<div class="embed-responsive embed-responsive-16by9 mt-3 trailer d-none">
      <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${movieObject.youtubeTrailers[0]}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>`
  }

  renderCarousel(movieObject){
    return `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="/img/slides/${movieObject.slides[0]}" alt="First slide">
          <div class="carousel-caption d-flex flex-column d-none">

          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/img/slides/${movieObject.slides[1]}" alt="Second slide">
          <div class="carousel-caption d-none d-md-block">
            <h2></h2>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/img/slides/${movieObject.slides[2]}" alt="Third slide">
          <div class="carousel-caption d-none d-md-block">
            <h2></h2>
          </div>
        </div>
      </div>

      <div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>`
  }

  // Renders movie with template.
  renderMovie() {
    this.render('.leftContainer');
  }

}
