# Minimizing train station list (from SNCF)

[`jq`](https://jqlang.github.io/jq/) is required.  

1. Filter input from https://ressources.data.sncf.com/explore/dataset/referentiel-gares-voyageurs 

    ```bash
    jq ".[] | .fields.intitule_gare, .fields.wgs_84" < referentiel-gares-voyageurs.json |\
    sed -e 's/\]/\]\},\{/g' -e 's/\[/:\[/g' > stations.json
    ```

2. clean the rest manually (header, wrong train stations, footer)

3. to validate

    ```bash
    jq < stations.json
    ```

4. to compress

    ```bash
    jq -c < stations.json
    ```
