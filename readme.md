## Download Files from DoubleClick

This project was created to provide a faster way of **downloading assets from the DoubleClick studio platform**. It was developed for Sky Works Digital team use. It gives the option of downloading all images from an assets folder in DC Studio platform on just one click.

If you work with DoubleClick Studio creatives you would probably love this solution to make your live easy when duplicating creatives from older ones.

## Getting Started

For running it localy, download the repository and run a pyton server on the folder you saved it:
	```
    python -m SimpleHTTPServer
    ```

Then, go to your browser and run localhost:8000

### Upload the csv file

Go to the assets folder you want to download the assets from and click the checkbox on the right of the name, click on the **dynamic paths** downloading button that will appear and a .csv file will be downloaded on your machine.

Drag or upload this file on the file field.

### Provide the folder base path

Copy the folder base path from the details menu on the right and paste it on the second field. It should look something like this:

```
https://s0.2mdn.net/ads/richmedia/studio/47293834/
```

### Download your assets

Click on the download button and your assets will be downloaded.

## Built With

* [Materialize](http://materializecss.com/) - The web framework used
* [JQUERY](https://jquery.com/) - Dependency Management

## Authors

* **[Carmen Chapa](https://github.com/carmenchapa)**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Evgeniya](https://github.com/evgeniyaaa)
* [Daniel Bardaji](https://github.com/DBardaji)
