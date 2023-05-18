const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");

// галп.задача server {браузер запустится из {базовая директоря= src}}
gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "src",
    },
  });
  //следи за html и если если изменится перезагрузи
  gulp.watch("src/*.html").on("change", browserSync.reload);
});


//задача styles 
gulp.task("styles", function () {
    //задача возвратит галп
  return gulp
    //перейди адресу src(и найдет файлы scss и sass)
    .src("src/sass/**/*.+(scss|sass)")
    //.pipe#канал (sass#скомпилируй файлы(примени стиль compressed)(покажи ошибку если она произойдет))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    //переименуем скомпилированый файл получится style.min.css
    .pipe(rename({ suffix: ".min", prefix: "" }))
    //добавляем префиксы
    .pipe(autoprefixer())
    //оптимизируем файл
    .pipe(cleanCSS({ compatibility: "ie8" }))
    //положи файл по адресу
    .pipe(gulp.dest("src/css"))
    //после изменения файлов запусти браузерСинк
    .pipe(browserSync.stream());
});

//задача watch
gulp.task("watch", function () {
    //галп следи за scss|sass и если измениться запусти задачу styles 
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
});


//задача(по умолчанию(запусти в галп паралельно(задачи)))
gulp.task("default", gulp.parallel("watch", "server", "styles"));
