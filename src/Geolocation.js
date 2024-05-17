const Geolocation = {
    getCurrentPosition: (success, error = console.error) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  };
  
  export default Geolocation;
  