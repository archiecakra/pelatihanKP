<h1>Manage User</h1>

<?php

include '../../config/koneksi.php';
$datauser = mysqli_query($koneksi , "select * from m_user");


echo '<table id="tbcourse" class="table table-stripped table-hover table-sm text-center">
<thead>
  <tr>
    <th>ID</th>
    <th>Username</th>
    <th>Password</th>
    <th>User Level</th>
    <th><i class="fa fa-cog"></i></th>
  <tr>
</thead>
';

echo "<tbody>";
while ($row = mysqli_fetch_array($datauser)) {
  // code...
  $id = $row['user_id'];
  $username = $row['user_nama'];
  $level = $row['user_level'];
  $password = $row['user_pwd'];

  echo "<tr>";
  echo "<td>$id</td>";
  echo "<td>$username</td>";
  echo "<td>$password</td>";
  echo "<td>$level</td>";
?>

<td>
  <button type="button" class="btn btn-warning btn-sm" data-target="#edit<?php echo $id;?>" data-toggle="modal"><i class="fa fa-pen"></i></button>
  <button type="button" class="btn btn-danger btn-sm" data-target="#delete<?php echo $id;?>" data-toggle="modal"><i class="fa fa-minus"></i></button>
</td>

<!-- Modal Edit User Start -->

<div class="modal fade" id="edit<?php echo $id;?>">
  <form class="form-horizontal" method="post" action="../../fungsi/admin_manage_user.php">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <!-- modal header start -->
        <div class="modal-header">
          <h4>Edit User "<?php echo $username;?>"</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <!-- modal header end -->
        <!-- modal body start -->
        <div class="modal-body">
          <div class="form-row">
            <div class="col-sm-3">
              <label class="control-label">Username</label>
            </div>
            <div class="col-sm-4">
              <input type="text" name="username" class="form-control" value="<?php echo $username;?>">
            </div>
          </div>
          <div class="form-row">
            <div class="col-sm-3">
              <label class="control-label">Password</label>
            </div>
            <div class="col-sm-4">
              <input type="text" name="password" class="form-control" value="<?php echo $password;?>">
            </div>
          </div>
          <div class="form-row">
            <div class="col-sm-3">
              <label class="control-label">Level</label>
            </div>
            <div class="col-sm-4">
              <input type="text" readonly class="form-control" value="<?php echo $level?>">
            </div>
          </div>
          <div class="form-row">
            <div class="col-sm-3">
              <label class="control-label">Ganti Level</label>
            </div>
            <div class="col-sm-4">
              <select class="form-control" name="level">
                <option value="admin">Admin</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>
        <!-- modal body end -->
        <!-- modal footer start -->
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" name="update-user">Submit</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        <!-- modal footer end -->
      </div>
    </div>
  </form>
</div>

<!-- Modal Edit User End -->

<?php
}
echo "</tbody>";
?>