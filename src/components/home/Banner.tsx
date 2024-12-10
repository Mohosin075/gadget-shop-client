function Banner() {
  return (
    <div
      className="hero min-h-screen w-full"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/still-life-casual-man-modern-male-accessories-black_155003-1728.jpg?t=st=1733857630~exp=1733861230~hmac=e8343ca6ac1fa344d08693bbb7429bfc4cfee103af6c0141f4c4abbaf6214cf5&w=826)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
