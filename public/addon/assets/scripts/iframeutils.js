// To use it, make sure import below first
// <link rel="stylesheet" href="../assets/layui/css/layui.css" >
// <script src="../assets/layui/layui.js"></script>
// <script src="../assets/scripts/iframeutils.js"></script>
var iframeutils = {
    LoadingTool: function() {
        const self = this;
        this.layerIndex = -1;

        this.turnOnLoading = function() {
            layui.use('layer', function(){
                let layer = layui.layer;
                
                self.layerIndex = layer.load(1, {
                    shade: [0.3,'#fff']
                });
        
                console.log("loading started: ", self.layerIndex);
            });
        }

        this.turnOffLoading = function() {
            layui.use('layer', function(){
                let layer = layui.layer;
                
                layer.close(self.layerIndex);
                console.log("loading closed: ", self.layerIndex);
            });
        }

        this.registerPreloadEvent = function() {
            document.addEventListener('DOMContentLoaded', function () {
                self.turnOnLoading();
                console.log("iframe container loaded");
            });
        }

        this.registerPostloadEvent = function(nodeId) {
            document.getElementById(nodeId).onload = function () {
                console.log("iframe onload");
                self.turnOffLoading();
                console.log("iframe loaded");
            };
        }
    }
}
