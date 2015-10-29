module.exports = function (grunt) {
	// 任务配置，所有插件的配置信息
	grunt.initConfig({
		// 获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),

		//uglify插件的配置信息
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/js/*.js',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			}
		},

		//cssmin插件的配置信息
		cssmin: {
			options: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.css <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/css/*.sprite.css',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.css.min.css'
			}
		},

		//jshint插件的配置信息
		jshint: {
			build: ['Gruntfile.js', 'src/js/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		//csslint插件的配置信息
		csslint: {
			build: ['src/css/*.css'],
			options: {
				jshintrc: '.csslintrc'
			}
		},

		//css-sprite插件的配置信息
		sprite: {
			options: {
				// sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
				imagepath: 'src/images/',
				// 映射CSS中背景路径，支持函数和数组，默认为 null
				imagepath_map: null,
				// 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
				spritedest: 'build/images/',
				// 替换后的背景路径，默认为 file.dest 和 spritedest 的相对路径
				spritepath: 'images/',
				// 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
				padding: 2,
				// 是否使用 image-set 作为2x图片实现，默认不使用
				useimageset: false,
				// 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
				newsprite: false,
				// 给雪碧图追加时间戳，默认不追加
				spritestamp: true,
				// 在CSS文件末尾追加时间戳，默认不追加
				cssstamp: true,
				// 默认使用二叉树最优排列算法
				algorithm: 'binary-tree',
				// 默认使用`pixelsmith`图像处理引擎
				engine: 'pixelsmith'
			},
			autoSprite: {
				files: [{
					// 启用动态扩展
					expand: true,
					// css文件源的文件夹
					cwd: 'src/css/',
					// 匹配规则
					src: '*.css',
					// 导出css和sprite的路径地址
					dest: 'src/css/',
					// 导出的css名
					ext: '.sprite.css'
				}]
			}
		}
	});

	// 告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-css-sprite');

	// 告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
	grunt.registerTask('default', ['jshint', 'uglify', 'sprite', 'cssmin']);
}