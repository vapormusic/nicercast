var NicerCast = require('../index.js');
var spawn = require('child_process').spawn;
var ffmpeg = spawn('C:\\ffmpeg\\bin\\ffmpeg.exe', [
    '-i', 'http://radio.plaza.one/mp3_low',
    '-acodec', 'pcm_s16le',
    '-f', 's16le',        // PCM 16bits, little-endian
    '-ar', '44100',       // Sampling rate
    '-ac', 2,             // Stereo
    'pipe:1'              // Output on stdout
  ]);

//   // pipe data to AirTunes
//   ffmpeg.stdout.pipe(airtunes);

  // detect if ffmpeg was not spawned correctly
  ffmpeg.stderr.setEncoding('utf8');
  ffmpeg.stderr.on('data', function(data) {
    if(/^execvp\(\)/.test(data)) {
      console.log('failed to start ' + 'C:\\ffmpeg\\bin\\ffmpeg.exe');
      process.exit(1);
    }
  });

var server = new NicerCast(ffmpeg.stdout, {});
server.start(8001);

var x = 0;
setInterval(function() {
	server.setMetadata('Test Metadata ' + x++);
}, 1000);
