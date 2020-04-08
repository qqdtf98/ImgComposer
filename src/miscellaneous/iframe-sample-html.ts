export const iframeSampleHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      margin: 0;
    }

    .display-flex {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    .box {
      width: 200px;
      height: 200px;
      margin: 20px;
      box-sizing: border-box;
    }

    .box-1 {
      background-color: #0bdada;
      border-radius: 10px;
    }

    .box-2 {
      background-color: #eb1e47;
      border-radius: 30px;
    }

    .box-3 {
      background-color: #deeffd;
      border-radius: 50px;
    }

    .box-4 {
      background-color: black;
      border-radius: 9999px;
    }
  </style>
</head>
<body>
  <div class="display-flex">
    <div class="box box-1"></div>
    <div class="box box-2"></div>
    <div class="box box-3"></div>
    <div class="box box-4"></div>
  </div>
</body>
</html>
`
