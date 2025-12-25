helm repo list
helm repo remove fission-charts
helm uninstall fission -n fission
kubectl delete ns fission admin-paas
kubectl delete crds canaryconfigs.fission.io functions.fission.io httptriggers.fission.io kuberneteswatchtriggers.fission.io messagequeuetriggers.fission.io environments.fission.io packages.fission.io timetriggers.fission.io
kubectl delete clusterrolebinding fission-builder-multins fission-executor-admin fission-executor-multins  fission-router-multins
kubectl delete servicemonitor fission-executor -n monitoring
kubectl delete servicemonitor fission-router -n monitoring
kubectl delete servicemonitor fission-storage -n monitoring
kubectl delete podmonitor fission-buildermgr -n monitoring
echo "Uninstalled Fission"
