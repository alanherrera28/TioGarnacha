<!DOCTYPE html>
<html lang="en">
<!-- Head -->		
<?php include 'partials/head.php';?>
<body id="page-top">
  <!-- Header -->		
  <?php include 'partials/header.php';?>

  

  <!-- Lugares -->
  <section id="lugares">
    <div class="container-fluid p-0">
      <div class="row no-gutters">
        <div class="col-md-6 col-sm-6" style="text-align:center">
          <br>
          <img class="img-fluid" src="img/portfolio/13.jpg" alt="Mawey Taqueria">
          <br><br>
          <button name="btnMawey" class="btn-primary btn-xl js-scroll-trigger" 
          type="button" onClick="mostrar_mawey()">
            Mawey Taco Bar <i class='fas fa-chevron-down'></i>
          </button>
        </div>
        <div class="col-md-6 col-sm-6" style="text-align:center">
          <br>
          <img class="img-fluid" src="img/portfolio/12.jpg" alt="Burnout Burguers">
          <br><br>
          <button name="btnMawey" class="btn-primary btn-xl js-scroll-trigger" 
          type="button" onClick="mostrar_bournout()">
          Burnout Burguers <i class='fas fa-chevron-down'></i>
          </button>
        </div>       
  </section>

  <br><br>

  <!-- start filosofia y objetivo Area -->		
  <?php include 'rest/mawey.php';?> <br>
  <?php include 'rest/burnout.php';?> <br>

  <br><br>

  <!-- Footer -->
  <?php include 'partials/footer.php';?>
</body>
</html>
