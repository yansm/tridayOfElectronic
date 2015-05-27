module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>  by <%= pkg.author %>*/\n',
			},
			build: {
				src: ['src/*.js'],
				dest: 'lib/myJquery.min.js'
			},
		},
		concat: {
			debug : {
				src: ['<%= uglify.build.src %>'],
				dest: 'lib/myJquery.debug.js'
			}
		},

		jsdoc: {
			src: ['<%= uglify.build.src %>'],
			destination: 'doc',
		},

		less: {
			portal : {
				src: 'stylesheets/myStyle.less',
				dest: 'stylesheets/myStyle.css',
				options: {
					compress: false
				}
			},
		},
		
		autoprefixer: {
		  build: {
			src: [ 'stylesheets/*.css' ]
		  }
		},
		csslint: {
		  options: {
			csslintrc: 'stylesheets/.csslintrc'
		  },
		  dist: [
			'stylesheets/myStyle.css',
		  ]
		},
		csscomb: {
		  options: {
			config: 'stylesheets/.csscomb.json'
		  },
		  dist: {
			expand: true,
			cwd: 'stylesheets/',
			src: ['*.css', '!*.min.css'],
			dest: 'stylesheets/'
		  }
		},
		cssmin: {
		  options: {
			keepSpecialComments: '0',
		  },
		  dist: {
			src: 'stylesheets/myStyle.css',
			dest: 'stylesheets/myStyle.min.css'
		  }
		},
		watch: {
			files: ['<%= uglify.build.src %>', '<%= less.portal.src %>'],
			tasks: ['concat','uglify', 'less','autoprefixer','csslint','csscomb','cssmin']
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-csscomb');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default',['concat','uglify', 'less','autoprefixer','csslint','csscomb','cssmin']);
};
