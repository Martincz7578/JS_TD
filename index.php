<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tower Defense</title>
<body>
    <table>
        <tr>
            <canvas id="canvas" width="500" height="500"></canvas>
            <p>Enemy HP: <span id="hp"></span></p>
            <h5>Round: <span id="rounds"></span></h5>
        </tr>
        <tr>
            <td>
                <select name="Tower slot 1" id="slot1">
                    <?php include 'options.php'; ?>
                </select>
            </td>
            <td>
                <select name="Tower slot 2" id="slot2">
                    <?php include 'options.php'; ?>
                </select>
            </td>
            <td>
                <select name="Tower slot 3" id="slot3">
                    <?php include 'options.php'; ?>
                </select>
            </td>
            <td>
                <select name="Tower slot 4" id="slot4">
                    <?php include 'options.php'; ?>
                </select>
            </td>
            <td>
                <select name="Tower slot 5" id="slot5">
                    <?php include 'options.php'; ?>
                </select>
            </td>
            <td>
                <select name="Tower slot 6" id="slot6">
                    <?php include 'options.php'; ?>
                </select>
            </td>
        </tr>
    </table>
    <script type="module" src="JS/gejm.js"></script>
    <script type="module" src="JS/towers/stacker.js"></script>
</body>
</html>