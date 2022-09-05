function initMap() {

const data = [
{location: new google.maps.LatLng(
                        parseFloat(-37.8136276),
                        parseFloat(144.9630576)),
                        weight:633228
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.338),
                        parseFloat(144.965)),
                        weight:823941
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.583333),
                        parseFloat(144.1)),
                        weight:490414
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3016566),
                        parseFloat(144.9497232)),
                        weight:610201
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.48999999999999),
                        parseFloat(144.588889)),
                        weight:943723
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.82508079999999),
                        parseFloat(144.7486706)),
                        weight:559090
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.583333),
                        parseFloat(142.116667)),
                        weight:117750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4717252),
                        parseFloat(143.7911684)),
                        weight:541968
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1353835),
                        parseFloat(145.8487441)),
                        weight:486514
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.2),
                        parseFloat(142.083)),
                        weight:459500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2033531),
                        parseFloat(146.519786)),
                        weight:458750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.574),
                        parseFloat(143.868)),
                        weight:439963
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2846464),
                        parseFloat(142.9316441)),
                        weight:303484
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3554705),
                        parseFloat(143.4230064)),
                        weight:212656
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3950602),
                        parseFloat(146.1498411)),
                        weight:492049
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.89),
                        parseFloat(144.63)),
                        weight:486031
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.833333),
                        parseFloat(147.616667)),
                        weight:328433
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5648841),
                        parseFloat(145.5342757)),
                        weight:283140
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.562),
                        parseFloat(144.874)),
                        weight:528206
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3686779),
                        parseFloat(142.4982086)),
                        weight:439530
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.2080167),
                        parseFloat(142.1245535)),
                        weight:365453
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.19333659999999),
                        parseFloat(146.9496305)),
                        weight:588906
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.116667),
                        parseFloat(144.85)),
                        weight:811893
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.172222),
                        parseFloat(146.267778)),
                        weight:309209
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.549),
                        parseFloat(143.847)),
                        weight:546318
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.765),
                        parseFloat(145.114)),
                        weight:1194677
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.8249059),
                        parseFloat(145.9696236)),
                        weight:416931
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:273500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.125545),
                        parseFloat(146.902535)),
                        weight:152500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1581064),
                        parseFloat(145.2535448)),
                        weight:628697
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.916667),
                        parseFloat(144.7)),
                        weight:419990
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7224518),
                        parseFloat(144.7226255)),
                        weight:405625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7290141),
                        parseFloat(144.7083286)),
                        weight:557118
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.11633459999999),
                        parseFloat(145.307612)),
                        weight:554643
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.383333),
                        parseFloat(145.4)),
                        weight:401320
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6089501),
                        parseFloat(145.5911028)),
                        weight:430820
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.416667),
                        parseFloat(143.616667)),
                        weight:248396
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.25),
                        parseFloat(144.516667)),
                        weight:1122647
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1537515),
                        parseFloat(145.9297824)),
                        weight:527724
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3410186),
                        parseFloat(143.5854622)),
                        weight:359394
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9619053),
                        parseFloat(146.9886238)),
                        weight:468853
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1062834),
                        parseFloat(145.3484256)),
                        weight:636831
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.895681),
                        parseFloat(145.2297799)),
                        weight:180000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7097302),
                        parseFloat(144.7268092)),
                        weight:553403
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.266667),
                        parseFloat(145.566667)),
                        weight:479947
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5125),
                        parseFloat(145.358333)),
                        weight:551118
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2),
                        parseFloat(144.283333)),
                        weight:404087
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.441),
                        parseFloat(145.43)),
                        weight:588740
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6763789),
                        parseFloat(144.4463206)),
                        weight:499811
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.081),
                        parseFloat(145.207)),
                        weight:724677
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.791629),
                        parseFloat(145.0482331)),
                        weight:989870
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1329),
                        parseFloat(144.3305)),
                        weight:582865
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7062046),
                        parseFloat(144.6019571)),
                        weight:488151
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8001),
                        parseFloat(144.9671)),
                        weight:917290
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2229373),
                        parseFloat(145.4070195)),
                        weight:597811
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.37383740000001),
                        parseFloat(145.6877037)),
                        weight:853942
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.173),
                        parseFloat(144.341)),
                        weight:626279
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1110794),
                        parseFloat(145.7663288)),
                        weight:538030
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0611204),
                        parseFloat(145.415089)),
                        weight:600523
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0309443),
                        parseFloat(145.3437469)),
                        weight:712700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.055),
                        parseFloat(145.303)),
                        weight:817681
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.073568),
                        parseFloat(145.4851308)),
                        weight:600053
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.144),
                        parseFloat(145.267)),
                        weight:750518
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9989202),
                        parseFloat(145.1743519)),
                        weight:1008160
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.049),
                        parseFloat(145.371)),
                        weight:624816
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.105),
                        parseFloat(145.279)),
                        weight:1692725
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.218),
                        parseFloat(144.367)),
                        weight:517803
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.17),
                        parseFloat(144.396)),
                        weight:521038
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.818),
                        parseFloat(145.252)),
                        weight:711118
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9980464),
                        parseFloat(144.0685988)),
                        weight:462934
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.633),
                        parseFloat(144.883)),
                        weight:649083
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3682777),
                        parseFloat(146.3172149)),
                        weight:341375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.11),
                        parseFloat(144.338)),
                        weight:574032
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.267),
                        parseFloat(145.018)),
                        weight:1594540
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.966667),
                        parseFloat(147.083333)),
                        weight:480270
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.753),
                        parseFloat(144.754)),
                        weight:579033
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4735452),
                        parseFloat(144.9731641)),
                        weight:616124
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7392692),
                        parseFloat(144.8864718)),
                        weight:1065212
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4228524),
                        parseFloat(143.3703651)),
                        weight:208273
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.892471),
                        parseFloat(144.5964645)),
                        weight:551182
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.360895),
                        parseFloat(141.6041155)),
                        weight:328415
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1515545),
                        parseFloat(144.5738608)),
                        weight:637224
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.654722),
                        parseFloat(144.437222)),
                        weight:766083
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.532),
                        parseFloat(143.823)),
                        weight:417450
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.333333),
                        parseFloat(144.316667)),
                        weight:949837
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0283807),
                        parseFloat(145.2687485)),
                        weight:572745
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9876769),
                        parseFloat(145.2394075)),
                        weight:563646
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2372957),
                        parseFloat(144.3740483)),
                        weight:522832
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.233333),
                        parseFloat(144.45)),
                        weight:799426
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.228),
                        parseFloat(145.062)),
                        weight:1146713
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.583333),
                        parseFloat(141.4)),
                        weight:241951
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8134091),
                        parseFloat(147.6297389)),
                        weight:569362
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0229202),
                        parseFloat(144.3964232)),
                        weight:564775
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.377),
                        parseFloat(144.838)),
                        weight:1055146
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0663518),
                        parseFloat(144.0405424)),
                        weight:299308
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.35),
                        parseFloat(144.15)),
                        weight:902013
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7891081),
                        parseFloat(145.1619649)),
                        weight:877331
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.8071478),
                        parseFloat(146.2223893)),
                        weight:899170
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.605),
                        parseFloat(145.146)),
                        weight:581666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8091678),
                        parseFloat(144.6672079)),
                        weight:558174
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.43783639999999),
                        parseFloat(145.8150854)),
                        weight:461594
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.0725808),
                        parseFloat(142.3187749)),
                        weight:132988
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.399),
                        parseFloat(143.803)),
                        weight:475983
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6334),
                        parseFloat(145.7278)),
                        weight:683495
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3787995),
                        parseFloat(145.1286167)),
                        weight:250941
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7431353),
                        parseFloat(145.0081354)),
                        weight:823142
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.01607970000001),
                        parseFloat(145.1619887)),
                        weight:599064
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.451111),
                        parseFloat(145.241944)),
                        weight:650850
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7358112),
                        parseFloat(144.9191456)),
                        weight:1316817
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.296),
                        parseFloat(143.786)),
                        weight:448954
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3694068),
                        parseFloat(142.9819619)),
                        weight:147826
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.937),
                        parseFloat(144.697)),
                        weight:1506625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.12),
                        parseFloat(144.32)),
                        weight:578067
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.851944),
                        parseFloat(144.963056)),
                        weight:1288742
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1240938),
                        parseFloat(146.8817639)),
                        weight:446779
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0739783),
                        parseFloat(147.5419531)),
                        weight:276154
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3267086),
                        parseFloat(146.5322429)),
                        weight:2337500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5366556),
                        parseFloat(143.9715484)),
                        weight:1317349
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.766667),
                        parseFloat(144.25)),
                        weight:544190
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5621587),
                        parseFloat(143.8502556)),
                        weight:570523
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7330556),
                        parseFloat(144.9525)),
                        weight:443946
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4967919),
                        parseFloat(144.6087925)),
                        weight:341831
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.664933),
                        parseFloat(144.3289536)),
                        weight:423933
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7911465),
                        parseFloat(147.8712905)),
                        weight:420071
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8163579),
                        parseFloat(145.1936683)),
                        weight:917732
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7988987),
                        parseFloat(144.892357)),
                        weight:736448
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.543194),
                        parseFloat(144.976419)),
                        weight:571216
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.553),
                        parseFloat(143.771)),
                        weight:456407
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1475938),
                        parseFloat(144.3572184)),
                        weight:532203
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.576),
                        parseFloat(143.877)),
                        weight:414354
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2275886),
                        parseFloat(146.4146185)),
                        weight:292214
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.87339860000001),
                        parseFloat(144.5820828)),
                        weight:626840
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5441741),
                        parseFloat(144.9846496)),
                        weight:533868
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8887708),
                        parseFloat(145.3973329)),
                        weight:551071
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5991822),
                        parseFloat(144.7540864)),
                        weight:502318
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6947332),
                        parseFloat(145.0602588)),
                        weight:653387
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.259),
                        parseFloat(145.189)),
                        weight:827177
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6868138),
                        parseFloat(144.4123614)),
                        weight:459382
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7304579),
                        parseFloat(144.652914)),
                        weight:471584
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.166667),
                        parseFloat(144.716667)),
                        weight:599201
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.463056),
                        parseFloat(145.303889)),
                        weight:655864
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4740327),
                        parseFloat(145.9436663)),
                        weight:368657
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.861),
                        parseFloat(144.885)),
                        weight:801161
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7805526),
                        parseFloat(144.9969514)),
                        weight:192751
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2769748),
                        parseFloat(144.728396)),
                        weight:888981
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7514308),
                        parseFloat(148.42875)),
                        weight:623256
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7632753),
                        parseFloat(144.3166595)),
                        weight:566480
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1521755),
                        parseFloat(145.1910175)),
                        weight:657989
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.171),
                        parseFloat(144.318)),
                        weight:698490
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.026173),
                        parseFloat(145.3067451)),
                        weight:700809
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5476567),
                        parseFloat(144.9669338)),
                        weight:621684
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1331326),
                        parseFloat(141.9437975)),
                        weight:111173
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.628056),
                        parseFloat(144.721111)),
                        weight:522705
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.768937),
                        parseFloat(144.305733)),
                        weight:568665
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1768917),
                        parseFloat(144.3002702)),
                        weight:813827
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.577),
                        parseFloat(143.844)),
                        weight:416115
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.383333),
                        parseFloat(145.35)),
                        weight:328345
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.538611),
                        parseFloat(144.606389)),
                        weight:1256139
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7695602),
                        parseFloat(144.8820803)),
                        weight:643924
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0271135),
                        parseFloat(145.9990577)),
                        weight:707507
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5153007),
                        parseFloat(143.914075)),
                        weight:199500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7570157),
                        parseFloat(144.2793906)),
                        weight:533304
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1943946),
                        parseFloat(145.7080742)),
                        weight:688250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3163383),
                        parseFloat(146.4232518)),
                        weight:316184
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8511185),
                        parseFloat(147.995821)),
                        weight:500204
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7673388),
                        parseFloat(144.9802463)),
                        weight:736277
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8826855),
                        parseFloat(145.2776105)),
                        weight:781725
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7188618),
                        parseFloat(142.1962316)),
                        weight:328541
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6731215),
                        parseFloat(144.6630148)),
                        weight:540086
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:254166
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9112576),
                        parseFloat(147.7123335)),
                        weight:482262
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.794384),
                        parseFloat(145.2815432)),
                        weight:795197
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.581111),
                        parseFloat(144.713889)),
                        weight:567407
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.105278),
                        parseFloat(144.065)),
                        weight:346083
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.716667),
                        parseFloat(144.25)),
                        weight:407478
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7963916),
                        parseFloat(145.1791034)),
                        weight:803190
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.19444379999999),
                        parseFloat(144.4670924)),
                        weight:548033
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.164167),
                        parseFloat(147.086944)),
                        weight:528028
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:347000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.133333),
                        parseFloat(144.35)),
                        weight:878560
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5835106),
                        parseFloat(146.013851)),
                        weight:713011
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8181073),
                        parseFloat(145.1238563)),
                        weight:682483
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8997995),
                        parseFloat(144.6641401)),
                        weight:532149
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.355122),
                        parseFloat(146.3272848)),
                        weight:159645
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4066923),
                        parseFloat(144.9798236)),
                        weight:493634
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.15),
                        parseFloat(144.333)),
                        weight:828944
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.132),
                        parseFloat(145.293)),
                        weight:595424
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6085118),
                        parseFloat(145.0313459)),
                        weight:569238
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.513889),
                        parseFloat(145.113889)),
                        weight:602883
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.77674440000001),
                        parseFloat(144.9110705)),
                        weight:774580
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.838),
                        parseFloat(145.144)),
                        weight:924642
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7358203),
                        parseFloat(147.1768206)),
                        weight:415339
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.116667),
                        parseFloat(144.65)),
                        weight:764482
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.356),
                        parseFloat(144.918)),
                        weight:857043
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.814),
                        parseFloat(145.271)),
                        weight:1045844
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0883415),
                        parseFloat(145.442323)),
                        weight:319195
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7303149),
                        parseFloat(144.2620417)),
                        weight:355982
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3),
                        parseFloat(145.433333)),
                        weight:450000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.25),
                        parseFloat(144.303611)),
                        weight:736347
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.93305600000001),
                        parseFloat(145.436944)),
                        weight:890299
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.516667),
                        parseFloat(143.716667)),
                        weight:1192421
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9322058),
                        parseFloat(145.4222435)),
                        weight:946593
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8384763),
                        parseFloat(144.847051)),
                        weight:885873
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2110528),
                        parseFloat(145.063089)),
                        weight:465389
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8992112),
                        parseFloat(147.6775564)),
                        weight:266505
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9178086),
                        parseFloat(144.7477259)),
                        weight:681455
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9401904),
                        parseFloat(145.4762409)),
                        weight:651753
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7457319),
                        parseFloat(144.6236631)),
                        weight:479916
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.374),
                        parseFloat(144.849)),
                        weight:746143
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.066667),
                        parseFloat(144.333333)),
                        weight:794806
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2606916),
                        parseFloat(141.5967036)),
                        weight:400875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2),
                        parseFloat(144.35)),
                        weight:602817
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.123),
                        parseFloat(145.153)),
                        weight:518230
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7573323),
                        parseFloat(147.6722422)),
                        weight:701497
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8604),
                        parseFloat(144.9732)),
                        weight:557265
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7438718),
                        parseFloat(147.7686461)),
                        weight:302525
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3274143),
                        parseFloat(144.2217727)),
                        weight:380781
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9256864),
                        parseFloat(144.5307089)),
                        weight:628250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.842),
                        parseFloat(144.884)),
                        weight:1183239
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.912067),
                        parseFloat(145.3558)),
                        weight:527278
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.59400000000001),
                        parseFloat(144.934)),
                        weight:594954
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2437824),
                        parseFloat(143.9943269)),
                        weight:384043
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7837112),
                        parseFloat(147.5751417)),
                        weight:685000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.416667),
                        parseFloat(144.75)),
                        weight:867500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.966667),
                        parseFloat(145.65)),
                        weight:420110
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.54949999999999),
                        parseFloat(143.9125)),
                        weight:798320
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.82275420000001),
                        parseFloat(144.6722793)),
                        weight:294520
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.8847165),
                        parseFloat(143.8522489)),
                        weight:3000000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4543694),
                        parseFloat(144.6873807)),
                        weight:749908
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1021731),
                        parseFloat(145.2535448)),
                        weight:537982
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4166685),
                        parseFloat(145.4064204)),
                        weight:637755
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9067871),
                        parseFloat(145.1890123)),
                        weight:1251732
                        },

{location: new google.maps.LatLng(
                        parseFloat(-33.8862843),
                        parseFloat(151.2301461)),
                        weight:655765
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.74300530000001),
                        parseFloat(144.3193914)),
                        weight:381760
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.864),
                        parseFloat(144.982)),
                        weight:576211
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8494981),
                        parseFloat(145.1090089)),
                        weight:976138
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1466246),
                        parseFloat(145.135722)),
                        weight:651666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.377),
                        parseFloat(144.872)),
                        weight:679229
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6885938),
                        parseFloat(144.3901108)),
                        weight:433500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.829),
                        parseFloat(144.957)),
                        weight:696580
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.077645),
                        parseFloat(143.2271185)),
                        weight:182812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4241222),
                        parseFloat(143.8912368)),
                        weight:352057
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.73314999999999),
                        parseFloat(144.6521281)),
                        weight:332000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.108457),
                        parseFloat(145.2466922)),
                        weight:270187
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6034859),
                        parseFloat(143.8155947)),
                        weight:361855
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.188889),
                        parseFloat(144.385)),
                        weight:851630
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.85),
                        parseFloat(143.733333)),
                        weight:132516
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.016667),
                        parseFloat(145.966667)),
                        weight:586999
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.835),
                        parseFloat(144.96)),
                        weight:682565
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1003957),
                        parseFloat(145.4132472)),
                        weight:612361
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.835776),
                        parseFloat(144.713862)),
                        weight:494950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.727),
                        parseFloat(144.942)),
                        weight:661893
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8810091),
                        parseFloat(145.0959519)),
                        weight:930416
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:189500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.526111),
                        parseFloat(145.336944)),
                        weight:829988
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6376635),
                        parseFloat(145.0264991)),
                        weight:588911
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6835831),
                        parseFloat(144.5779508)),
                        weight:468460
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.351),
                        parseFloat(144.922)),
                        weight:1429571
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5432739),
                        parseFloat(143.7835144)),
                        weight:606500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.7551525),
                        parseFloat(143.6675853)),
                        weight:891247
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.05),
                        parseFloat(144.166667)),
                        weight:666922
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4804163),
                        parseFloat(144.9456929)),
                        weight:507104
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.703056),
                        parseFloat(144.571944)),
                        weight:478780
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.306),
                        parseFloat(145.189)),
                        weight:691424
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1026004),
                        parseFloat(147.073027)),
                        weight:437943
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.52542469999999),
                        parseFloat(145.3768484)),
                        weight:623231
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9388113),
                        parseFloat(145.1267061)),
                        weight:708010
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0625288),
                        parseFloat(146.0821493)),
                        weight:759946
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9),
                        parseFloat(145.233333)),
                        weight:471045
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.19508320000001),
                        parseFloat(144.456496)),
                        weight:210000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.466667),
                        parseFloat(145.233333)),
                        weight:816987
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.336023),
                        parseFloat(145.0399797)),
                        weight:1049310
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7802263),
                        parseFloat(145.1528312)),
                        weight:527847
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0868493),
                        parseFloat(145.8615582)),
                        weight:740841
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.196),
                        parseFloat(145.157)),
                        weight:630224
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8074324),
                        parseFloat(145.0288674)),
                        weight:1861665
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.712),
                        parseFloat(144.831)),
                        weight:739696
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.555),
                        parseFloat(143.8)),
                        weight:565133
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.138056),
                        parseFloat(144.71)),
                        weight:478951
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8631512),
                        parseFloat(144.8120218)),
                        weight:909319
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3506332),
                        parseFloat(144.7428496)),
                        weight:769549
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.7409643),
                        parseFloat(143.9261931)),
                        weight:256108
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.133333),
                        parseFloat(141.6166671)),
                        weight:352784
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.783333),
                        parseFloat(144.233333)),
                        weight:503755
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2739835),
                        parseFloat(144.4862111)),
                        weight:1552959
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9145479),
                        parseFloat(145.127492)),
                        weight:748846
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7455702),
                        parseFloat(142.0178976)),
                        weight:364807
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.67326620000001),
                        parseFloat(143.3740654)),
                        weight:100000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9605286),
                        parseFloat(143.9813554)),
                        weight:527500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7028259),
                        parseFloat(148.4653469)),
                        weight:241786
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6557161),
                        parseFloat(146.0689038)),
                        weight:952166
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7563131),
                        parseFloat(146.4167014)),
                        weight:510937
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0686692),
                        parseFloat(144.1801852)),
                        weight:518138
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5090925),
                        parseFloat(145.2949976)),
                        weight:544560
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.320519),
                        parseFloat(143.0828766)),
                        weight:256369
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5305636),
                        parseFloat(143.8590384)),
                        weight:439478
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.393),
                        parseFloat(145.163)),
                        weight:1565944
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.611944),
                        parseFloat(143.584444)),
                        weight:242881
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9650097),
                        parseFloat(145.1733926)),
                        weight:615895
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5555446),
                        parseFloat(146.7237861)),
                        weight:463602
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8106372),
                        parseFloat(145.2307011)),
                        weight:719457
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0556784),
                        parseFloat(144.1341779)),
                        weight:212093
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4419698),
                        parseFloat(145.6642077)),
                        weight:707000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.738),
                        parseFloat(145.223)),
                        weight:655152
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8974068),
                        parseFloat(142.7953267)),
                        weight:350400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0704681),
                        parseFloat(145.2424941)),
                        weight:656528
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1499181),
                        parseFloat(144.3617186)),
                        weight:847947
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6265235),
                        parseFloat(145.0672551)),
                        weight:374317
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.11454),
                        parseFloat(145.25582)),
                        weight:557050
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.055556),
                        parseFloat(146.4625)),
                        weight:482969
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1262305),
                        parseFloat(145.2361721)),
                        weight:638267
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8035174),
                        parseFloat(147.6191276)),
                        weight:554301
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8822486),
                        parseFloat(144.9825759)),
                        weight:1008972
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.650278),
                        parseFloat(143.883889)),
                        weight:620203
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4242265),
                        parseFloat(145.463777)),
                        weight:690736
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8190118),
                        parseFloat(144.9465764)),
                        weight:779482
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8606804),
                        parseFloat(148.0669106)),
                        weight:292667
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1596163),
                        parseFloat(146.3612622)),
                        weight:359086
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.433333),
                        parseFloat(145.45)),
                        weight:463616
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.07552159999999),
                        parseFloat(142.8100364)),
                        weight:309566
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.383333),
                        parseFloat(144.316667)),
                        weight:653355
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.089966),
                        parseFloat(147.0577332)),
                        weight:417480
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8139252),
                        parseFloat(143.535837)),
                        weight:154570
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8387468),
                        parseFloat(141.5067129)),
                        weight:725000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:235593
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2960425),
                        parseFloat(142.3553505)),
                        weight:492792
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4993994),
                        parseFloat(145.5912693)),
                        weight:883750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8600246),
                        parseFloat(145.0593297)),
                        weight:781117
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9279826),
                        parseFloat(145.2330751)),
                        weight:894937
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1954052),
                        parseFloat(144.393187)),
                        weight:498365
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.758),
                        parseFloat(145.35)),
                        weight:763637
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.564717),
                        parseFloat(144.717702)),
                        weight:740936
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1646432),
                        parseFloat(146.0689038)),
                        weight:519052
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7408137),
                        parseFloat(144.5955239)),
                        weight:477976
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4363851),
                        parseFloat(145.711384)),
                        weight:790105
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5245635),
                        parseFloat(144.955677)),
                        weight:584435
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.715),
                        parseFloat(145.158)),
                        weight:1076846
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.517945),
                        parseFloat(143.7084479)),
                        weight:773378
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4958178),
                        parseFloat(145.2659786)),
                        weight:482439
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9655346),
                        parseFloat(146.919692)),
                        weight:436621
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8115088),
                        parseFloat(147.6779106)),
                        weight:195786
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2909123),
                        parseFloat(147.3941583)),
                        weight:1400000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5462177),
                        parseFloat(145.963353)),
                        weight:414077
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4098645),
                        parseFloat(144.7326224)),
                        weight:270500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1767277),
                        parseFloat(144.5327632)),
                        weight:615682
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.70436979999999),
                        parseFloat(145.1006438)),
                        weight:854896
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.23425599999999),
                        parseFloat(144.9026948)),
                        weight:586875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.566944),
                        parseFloat(144.316944)),
                        weight:940562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.823),
                        parseFloat(144.998)),
                        weight:727177
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8),
                        parseFloat(144.366667)),
                        weight:721933
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.076),
                        parseFloat(145.122)),
                        weight:764611
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0741368),
                        parseFloat(144.358638)),
                        weight:499024
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.65),
                        parseFloat(146.2)),
                        weight:479767
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.3075),
                        parseFloat(142.188056)),
                        weight:287191
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.461511),
                        parseFloat(144.1057661)),
                        weight:1505951
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.671),
                        parseFloat(145.155)),
                        weight:944519
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8626196),
                        parseFloat(145.0007064)),
                        weight:829603
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8089044),
                        parseFloat(144.9290625)),
                        weight:681144
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5655288),
                        parseFloat(143.8264533)),
                        weight:906166
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0307143),
                        parseFloat(141.2834751)),
                        weight:168384
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0473301),
                        parseFloat(143.7446068)),
                        weight:419477
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8626744),
                        parseFloat(145.2856552)),
                        weight:699989
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4255405),
                        parseFloat(143.6176937)),
                        weight:524700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2455018),
                        parseFloat(144.3514428)),
                        weight:653682
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7946578),
                        parseFloat(145.0848683)),
                        weight:2787108
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6381741),
                        parseFloat(143.8899389)),
                        weight:925981
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0063441),
                        parseFloat(145.273282)),
                        weight:854505
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.56319999999999),
                        parseFloat(143.869)),
                        weight:528350
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2355272),
                        parseFloat(143.1426455)),
                        weight:339423
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6297878),
                        parseFloat(143.8834861)),
                        weight:345105
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3139409),
                        parseFloat(145.0468064)),
                        weight:379545
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.545995),
                        parseFloat(145.0051249)),
                        weight:516622
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.71),
                        parseFloat(144.95)),
                        weight:734507
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.766667),
                        parseFloat(144.283333)),
                        weight:522738
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.60659589999999),
                        parseFloat(145.0072033)),
                        weight:677175
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5700515),
                        parseFloat(143.7994773)),
                        weight:427088
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.196389),
                        parseFloat(142.058611)),
                        weight:436225
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2640693),
                        parseFloat(144.4623088)),
                        weight:1388605
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7),
                        parseFloat(144.316667)),
                        weight:519159
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.716667),
                        parseFloat(144.283333)),
                        weight:402496
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6229982),
                        parseFloat(144.7047804)),
                        weight:501784
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.589),
                        parseFloat(143.814)),
                        weight:473563
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.478525),
                        parseFloat(142.9734629)),
                        weight:502624
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9490959),
                        parseFloat(145.0460123)),
                        weight:749136
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0633285),
                        parseFloat(145.3198556)),
                        weight:480000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0238277),
                        parseFloat(147.2413889)),
                        weight:647341
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.35),
                        parseFloat(145.75)),
                        weight:642458
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8891994),
                        parseFloat(145.0570577)),
                        weight:703391
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8978307),
                        parseFloat(145.070895)),
                        weight:1137611
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.18093289999999),
                        parseFloat(144.5985292)),
                        weight:748389
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9812276),
                        parseFloat(145.0647654)),
                        weight:1243404
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.744),
                        parseFloat(145.047)),
                        weight:651704
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5892795),
                        parseFloat(145.103791)),
                        weight:523409
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.14),
                        parseFloat(144.33)),
                        weight:1418016
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7692917),
                        parseFloat(144.9990291)),
                        weight:742299
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.87435019999999),
                        parseFloat(145.1668205)),
                        weight:924703
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1467982),
                        parseFloat(142.5235245)),
                        weight:765332
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.15),
                        parseFloat(146.783)),
                        weight:343273
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5739972),
                        parseFloat(145.6994958)),
                        weight:595261
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9827396),
                        parseFloat(146.7911606)),
                        weight:349187
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7112844),
                        parseFloat(142.839973)),
                        weight:194921
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7442306),
                        parseFloat(144.7999941)),
                        weight:642991
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1),
                        parseFloat(144.333333)),
                        weight:681374
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3329),
                        parseFloat(145.6698)),
                        weight:809736
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.39902110000001),
                        parseFloat(144.2125766)),
                        weight:503062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3240971),
                        parseFloat(142.3940586)),
                        weight:946053
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1),
                        parseFloat(144.328)),
                        weight:501621
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.402),
                        parseFloat(144.972)),
                        weight:256666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4619237),
                        parseFloat(147.2510078)),
                        weight:333750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.719),
                        parseFloat(145.126)),
                        weight:1060870
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9656436),
                        parseFloat(145.0578515)),
                        weight:942092
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.722),
                        parseFloat(144.803)),
                        weight:562285
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7778248),
                        parseFloat(144.379516)),
                        weight:741254
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.74299999999999),
                        parseFloat(144.209)),
                        weight:841836
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5187171),
                        parseFloat(148.9303017)),
                        weight:170000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4834062),
                        parseFloat(145.1727694)),
                        weight:788064
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4366557),
                        parseFloat(145.2328259)),
                        weight:347155
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5452519),
                        parseFloat(146.9745677)),
                        weight:497671
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4626787),
                        parseFloat(142.164648)),
                        weight:425000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4738806),
                        parseFloat(147.0175042)),
                        weight:235000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4),
                        parseFloat(145.533333)),
                        weight:548079
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.233333),
                        parseFloat(142.166667)),
                        weight:371081
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.602),
                        parseFloat(143.868)),
                        weight:389490
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4526285),
                        parseFloat(141.7909381)),
                        weight:225000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.694433),
                        parseFloat(146.9264143)),
                        weight:762539
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1760805),
                        parseFloat(146.2985284)),
                        weight:426888
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.67833299999999),
                        parseFloat(143.676111)),
                        weight:370743
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.616667),
                        parseFloat(146.666667)),
                        weight:342035
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4526584),
                        parseFloat(147.2403405)),
                        weight:437041
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3209075),
                        parseFloat(146.1550012)),
                        weight:1823500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.383333),
                        parseFloat(146.383333)),
                        weight:796787
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2986311),
                        parseFloat(146.5368986)),
                        weight:615095
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6655588),
                        parseFloat(145.0165638)),
                        weight:741436
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.916667),
                        parseFloat(147.733333)),
                        weight:566802
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.252755),
                        parseFloat(142.3919552)),
                        weight:218128
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.383333),
                        parseFloat(146.266667)),
                        weight:383774
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8479567),
                        parseFloat(145.2289289)),
                        weight:800479
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.363),
                        parseFloat(145.202)),
                        weight:582952
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.75864809999999),
                        parseFloat(144.9448586)),
                        weight:383321
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9211364),
                        parseFloat(145.059135)),
                        weight:1218154
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.683333),
                        parseFloat(145.8)),
                        weight:604709
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.28333300000001),
                        parseFloat(144.6)),
                        weight:989987
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.672),
                        parseFloat(144.585)),
                        weight:539317
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0575657),
                        parseFloat(142.7753712)),
                        weight:441052
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4896569),
                        parseFloat(146.5726463)),
                        weight:425531
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3379002),
                        parseFloat(146.4371315)),
                        weight:1025500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0290603),
                        parseFloat(145.274765)),
                        weight:579950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8966159),
                        parseFloat(145.0832264)),
                        weight:648728
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8019),
                        parseFloat(144.98815)),
                        weight:851828
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2951571),
                        parseFloat(142.8873059)),
                        weight:775175
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7072243),
                        parseFloat(144.9669297)),
                        weight:662551
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2),
                        parseFloat(146.15)),
                        weight:597196
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7319672),
                        parseFloat(144.5762446)),
                        weight:478771
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8361684),
                        parseFloat(147.6495717)),
                        weight:293064
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.55),
                        parseFloat(143.858)),
                        weight:966005
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.767),
                        parseFloat(145.287)),
                        weight:765539
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5608219),
                        parseFloat(144.0575587)),
                        weight:955000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7255403),
                        parseFloat(143.803634)),
                        weight:548500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.585278),
                        parseFloat(143.839444)),
                        weight:373748
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.208813),
                        parseFloat(144.2709146)),
                        weight:604328
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.938056),
                        parseFloat(142.42)),
                        weight:172875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.903),
                        parseFloat(145.33)),
                        weight:697938
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.53300000000001),
                        parseFloat(143.903)),
                        weight:733649
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5397),
                        parseFloat(143.8676)),
                        weight:651353
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6837782),
                        parseFloat(144.4089115)),
                        weight:486656
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3733285),
                        parseFloat(143.5743866)),
                        weight:363355
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7359634),
                        parseFloat(144.2784231)),
                        weight:633820
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7941207),
                        parseFloat(144.9276659)),
                        weight:617968
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.878),
                        parseFloat(145.335)),
                        weight:1287416
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.366667),
                        parseFloat(144.7)),
                        weight:284518
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4281226),
                        parseFloat(144.5556723)),
                        weight:871494
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8629027),
                        parseFloat(144.6854533)),
                        weight:529646
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.322),
                        parseFloat(144.986)),
                        weight:882724
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7703),
                        parseFloat(145.0457)),
                        weight:831537
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1000508),
                        parseFloat(145.7189396)),
                        weight:675821
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1),
                        parseFloat(144.2)),
                        weight:728813
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7321521),
                        parseFloat(146.9836221)),
                        weight:700680
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8332233),
                        parseFloat(144.9124697)),
                        weight:1053911
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9761167),
                        parseFloat(144.4868955)),
                        weight:559593
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9387389),
                        parseFloat(146.2433388)),
                        weight:480500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2),
                        parseFloat(144.1)),
                        weight:820625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6146129),
                        parseFloat(144.2415697)),
                        weight:521085
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8006709),
                        parseFloat(144.8716645)),
                        weight:757413
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.189),
                        parseFloat(145.092)),
                        weight:1674124
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.421149),
                        parseFloat(145.8746249)),
                        weight:700906
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1192184),
                        parseFloat(146.3656381)),
                        weight:615213
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.2396695),
                        parseFloat(143.5527423)),
                        weight:295000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.3396318),
                        parseFloat(143.5524803)),
                        weight:400056
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.733333),
                        parseFloat(144.3)),
                        weight:505516
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2615783),
                        parseFloat(144.5971586)),
                        weight:398950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7304657),
                        parseFloat(147.152596)),
                        weight:444149
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.883333),
                        parseFloat(147.85)),
                        weight:407669
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.45611100000001),
                        parseFloat(144.085833)),
                        weight:1120977
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.733333),
                        parseFloat(144.133333)),
                        weight:611556
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.237778),
                        parseFloat(143.481667)),
                        weight:548375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.972),
                        parseFloat(145.021)),
                        weight:2681237
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1242129),
                        parseFloat(146.8574235)),
                        weight:498487
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.69431429999999),
                        parseFloat(144.7147977)),
                        weight:341000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7114015),
                        parseFloat(144.7195897)),
                        weight:328000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5351183),
                        parseFloat(144.9114571)),
                        weight:620068
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6042078),
                        parseFloat(145.0064295)),
                        weight:755438
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9642807),
                        parseFloat(147.6814535)),
                        weight:257000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7215428),
                        parseFloat(144.6625687)),
                        weight:566336
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8622254),
                        parseFloat(144.7479385)),
                        weight:988966
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.52194360000001),
                        parseFloat(146.2268784)),
                        weight:770000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8526163),
                        parseFloat(145.1519822)),
                        weight:767737
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3824779),
                        parseFloat(146.7611674)),
                        weight:672083
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.092),
                        parseFloat(144.356)),
                        weight:417479
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3299937),
                        parseFloat(145.4008446)),
                        weight:370622
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.083333),
                        parseFloat(144.266667)),
                        weight:369649
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.5039675),
                        parseFloat(143.884505)),
                        weight:300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.058136),
                        parseFloat(144.2185006)),
                        weight:790845
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4),
                        parseFloat(144.583333)),
                        weight:1881702
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1599861),
                        parseFloat(146.890967)),
                        weight:469851
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.13479239999999),
                        parseFloat(144.2906169)),
                        weight:933856
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.581),
                        parseFloat(143.853)),
                        weight:441500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.783),
                        parseFloat(144.878)),
                        weight:802143
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.75),
                        parseFloat(145.566667)),
                        weight:418528
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.23307930000001),
                        parseFloat(146.8374363)),
                        weight:408948
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2455668),
                        parseFloat(144.9577866)),
                        weight:317632
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.587992),
                        parseFloat(144.0177462)),
                        weight:783000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.833333),
                        parseFloat(145.683333)),
                        weight:895000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.608611),
                        parseFloat(146.903889)),
                        weight:260595
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.318486),
                        parseFloat(146.2873482)),
                        weight:312000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5408253),
                        parseFloat(144.9975392)),
                        weight:493838
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4096639),
                        parseFloat(144.1825171)),
                        weight:1364803
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.316667),
                        parseFloat(146.316667)),
                        weight:555294
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1077891),
                        parseFloat(147.0280652)),
                        weight:427517
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.565594),
                        parseFloat(146.6751045)),
                        weight:402480
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.84),
                        parseFloat(144.989)),
                        weight:1047096
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.371),
                        parseFloat(145.118)),
                        weight:1094219
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2112639),
                        parseFloat(142.8734706)),
                        weight:189000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.87695180000001),
                        parseFloat(145.2329617)),
                        weight:645806
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.55),
                        parseFloat(149.75)),
                        weight:570286
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1459548),
                        parseFloat(144.7448007)),
                        weight:438799
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4834268),
                        parseFloat(144.3026601)),
                        weight:392562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1313962),
                        parseFloat(145.6023644)),
                        weight:320210
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8247291),
                        parseFloat(143.7562257)),
                        weight:470025
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6983515),
                        parseFloat(148.715807)),
                        weight:228687
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.616618),
                        parseFloat(143.2603641)),
                        weight:208946
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.754),
                        parseFloat(145.327)),
                        weight:819755
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.991),
                        parseFloat(145.08)),
                        weight:1545679
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5502577),
                        parseFloat(143.875336)),
                        weight:446188
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8202741),
                        parseFloat(144.8821697)),
                        weight:964463
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8721762),
                        parseFloat(144.6156821)),
                        weight:305000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.318486),
                        parseFloat(146.2873482)),
                        weight:910628
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.233333),
                        parseFloat(144.166667)),
                        weight:1145601
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7255562),
                        parseFloat(142.2443444)),
                        weight:610630
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8303331),
                        parseFloat(145.047703)),
                        weight:719717
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.597242),
                        parseFloat(144.7082247)),
                        weight:487106
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6897235),
                        parseFloat(144.7167148)),
                        weight:575290
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8823641),
                        parseFloat(144.5934827)),
                        weight:356375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4789491),
                        parseFloat(144.9650835)),
                        weight:460114
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5323804),
                        parseFloat(144.9632374)),
                        weight:581010
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.183333),
                        parseFloat(143.25)),
                        weight:581234
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6999038),
                        parseFloat(144.5382417)),
                        weight:519040
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4693479),
                        parseFloat(145.6329536)),
                        weight:1100000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.211111),
                        parseFloat(145.38)),
                        weight:858524
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.545995),
                        parseFloat(145.0051249)),
                        weight:459075
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6034859),
                        parseFloat(143.8155947)),
                        weight:400195
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3952162),
                        parseFloat(144.9903551)),
                        weight:717649
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.198),
                        parseFloat(145.489)),
                        weight:541742
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6926696),
                        parseFloat(144.8951801)),
                        weight:632091
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.1613339),
                        parseFloat(142.0475029)),
                        weight:196645
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6848161),
                        parseFloat(143.7816296)),
                        weight:185000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7671034),
                        parseFloat(145.0926559)),
                        weight:1032106
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.576),
                        parseFloat(143.877)),
                        weight:435080
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:520940
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.054229),
                        parseFloat(145.326084)),
                        weight:481289
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.616667),
                        parseFloat(145.216667)),
                        weight:432047
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.459),
                        parseFloat(144.598)),
                        weight:657823
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8192349),
                        parseFloat(144.6930395)),
                        weight:486748
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.037),
                        parseFloat(145.113)),
                        weight:993243
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9525),
                        parseFloat(145.012311)),
                        weight:1134942
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9493465),
                        parseFloat(145.1527935)),
                        weight:848754
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8904712),
                        parseFloat(144.4401991)),
                        weight:430953
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7304579),
                        parseFloat(144.652914)),
                        weight:305960
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7444436),
                        parseFloat(144.6583579)),
                        weight:338500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2625),
                        parseFloat(144.1494444)),
                        weight:893750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2024817),
                        parseFloat(144.3603806)),
                        weight:850180
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.822072),
                        parseFloat(147.0717292)),
                        weight:331683
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.843),
                        parseFloat(145.268)),
                        weight:674003
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6344134),
                        parseFloat(144.3451301)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0325875),
                        parseFloat(143.6376138)),
                        weight:226812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8055831),
                        parseFloat(144.891002)),
                        weight:823811
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.809),
                        parseFloat(144.878)),
                        weight:744616
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8346154),
                        parseFloat(144.6526479)),
                        weight:307000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8715626),
                        parseFloat(144.7775818)),
                        weight:630594
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.25),
                        parseFloat(144.25)),
                        weight:611625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.656111),
                        parseFloat(145.513889)),
                        weight:716502
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.5055413),
                        parseFloat(142.8526896)),
                        weight:149656
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2936345),
                        parseFloat(147.1467693)),
                        weight:269812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2702014),
                        parseFloat(145.3973329)),
                        weight:875000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.806433),
                        parseFloat(144.7068558)),
                        weight:311052
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.788931),
                        parseFloat(144.991323)),
                        weight:534024
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7062826),
                        parseFloat(144.5552018)),
                        weight:418570
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.032),
                        parseFloat(145.602)),
                        weight:957581
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1385938),
                        parseFloat(146.952051)),
                        weight:593516
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:240000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.033333),
                        parseFloat(144.05)),
                        weight:682864
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7119373),
                        parseFloat(144.8753781)),
                        weight:480400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.41889),
                        parseFloat(146.080755)),
                        weight:508500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.883333),
                        parseFloat(142.283333)),
                        weight:177534
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2),
                        parseFloat(146.066667)),
                        weight:767745
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.8149095),
                        parseFloat(144.2095074)),
                        weight:283762
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.983333),
                        parseFloat(145.716667)),
                        weight:796312
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9277583),
                        parseFloat(147.692083)),
                        weight:465491
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3533015),
                        parseFloat(146.6877247)),
                        weight:692719
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.433333),
                        parseFloat(146.433333)),
                        weight:458218
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.931),
                        parseFloat(145.398)),
                        weight:987812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1483333),
                        parseFloat(145.1334448)),
                        weight:465000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.999),
                        parseFloat(145.247)),
                        weight:558027
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7471636),
                        parseFloat(144.5640379)),
                        weight:644697
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.07),
                        parseFloat(145.291)),
                        weight:632247
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37),
                        parseFloat(144.25)),
                        weight:412564
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3613204),
                        parseFloat(144.5244238)),
                        weight:1453213
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.68608690000001),
                        parseFloat(144.9269889)),
                        weight:671851
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.051111),
                        parseFloat(145.121944)),
                        weight:750182
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8840703),
                        parseFloat(146.9945377)),
                        weight:451750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.226),
                        parseFloat(145.177)),
                        weight:933917
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2029416),
                        parseFloat(144.6862995)),
                        weight:950000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2194035),
                        parseFloat(147.1933136)),
                        weight:299220
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0456981),
                        parseFloat(144.171445)),
                        weight:392000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1282975),
                        parseFloat(145.3490138)),
                        weight:452930
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1262305),
                        parseFloat(145.2361721)),
                        weight:520249
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7793071),
                        parseFloat(144.2948079)),
                        weight:370756
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.088056),
                        parseFloat(143.473889)),
                        weight:681668
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9847811),
                        parseFloat(145.2139907)),
                        weight:491342
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.083333),
                        parseFloat(145.933333)),
                        weight:875468
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3285622),
                        parseFloat(146.3663374)),
                        weight:542515
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.719),
                        parseFloat(144.777)),
                        weight:603195
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5404474),
                        parseFloat(144.9548652)),
                        weight:523273
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.69972200000001),
                        parseFloat(146.464722)),
                        weight:425219
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2061236),
                        parseFloat(147.0468626)),
                        weight:582500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3889938),
                        parseFloat(145.1182718)),
                        weight:1498125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1093956),
                        parseFloat(144.3521811)),
                        weight:684438
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8184273),
                        parseFloat(145.1760206)),
                        weight:865223
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7100539),
                        parseFloat(144.1829124)),
                        weight:305999
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5452578),
                        parseFloat(144.1744187)),
                        weight:1450625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.787397),
                        parseFloat(145.1248634)),
                        weight:883012
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.15),
                        parseFloat(146.6)),
                        weight:311070
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3753075),
                        parseFloat(144.4232713)),
                        weight:3150000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9158819),
                        parseFloat(145.0179852)),
                        weight:783166
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.633333),
                        parseFloat(145.083333)),
                        weight:652914
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9891122),
                        parseFloat(141.9401606)),
                        weight:124000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.75),
                        parseFloat(142.183333)),
                        weight:473807
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3954374),
                        parseFloat(145.6335765)),
                        weight:760000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:349250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5941229),
                        parseFloat(143.7694626)),
                        weight:440410
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:335000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1660705),
                        parseFloat(142.9653336)),
                        weight:239900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.41359120000001),
                        parseFloat(146.0870297)),
                        weight:575437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.663),
                        parseFloat(145.183)),
                        weight:1036647
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4064638),
                        parseFloat(144.9618719)),
                        weight:178562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2280947),
                        parseFloat(147.3757681)),
                        weight:160147
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.022778),
                        parseFloat(145.118889)),
                        weight:1125683
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.935),
                        parseFloat(145.492)),
                        weight:677768
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7790074),
                        parseFloat(145.0181267)),
                        weight:1029216
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.888853),
                        parseFloat(144.5990084)),
                        weight:313500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.816667),
                        parseFloat(147.733333)),
                        weight:475613
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5014318),
                        parseFloat(144.5828718)),
                        weight:672228
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1028946),
                        parseFloat(144.0398618)),
                        weight:857132
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7587658),
                        parseFloat(144.9933434)),
                        weight:928642
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.78),
                        parseFloat(145.023)),
                        weight:1377965
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.25),
                        parseFloat(144.383333)),
                        weight:1897500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7606794),
                        parseFloat(145.1532486)),
                        weight:253000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6597789),
                        parseFloat(146.3041191)),
                        weight:242813
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.383333),
                        parseFloat(143.883333)),
                        weight:958063
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7976791),
                        parseFloat(144.2866151)),
                        weight:547386
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.966667),
                        parseFloat(144.133333)),
                        weight:727169
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.65777569999999),
                        parseFloat(146.3819528)),
                        weight:507500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4201593),
                        parseFloat(146.3411655)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6847168),
                        parseFloat(143.3643289)),
                        weight:141283
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.546),
                        parseFloat(143.82)),
                        weight:520982
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.68010930000001),
                        parseFloat(144.0099222)),
                        weight:797265
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.777),
                        parseFloat(145.249)),
                        weight:1075963
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6333464),
                        parseFloat(143.6887979)),
                        weight:364671
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.799167),
                        parseFloat(144.946667)),
                        weight:442527
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.112928),
                        parseFloat(146.655462)),
                        weight:467523
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7968182),
                        parseFloat(144.6229115)),
                        weight:484130
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4187348),
                        parseFloat(141.7529589)),
                        weight:103000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.132),
                        parseFloat(145.327)),
                        weight:552472
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7154505),
                        parseFloat(145.0077433)),
                        weight:703592
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7504821),
                        parseFloat(144.9143187)),
                        weight:808592
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.687232),
                        parseFloat(144.9128564)),
                        weight:506781
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.566667),
                        parseFloat(149.15)),
                        weight:154921
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7297422),
                        parseFloat(144.742335)),
                        weight:315000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1048122),
                        parseFloat(144.1290677)),
                        weight:1690000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7205393),
                        parseFloat(144.0357785)),
                        weight:669000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0994897),
                        parseFloat(145.1726257)),
                        weight:492876
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7291107),
                        parseFloat(145.1789802)),
                        weight:3500000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6304407),
                        parseFloat(142.6310313)),
                        weight:121993
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.333333),
                        parseFloat(144.3)),
                        weight:1325853
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8197129),
                        parseFloat(145.1530529)),
                        weight:1128291
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.766291),
                        parseFloat(147.827237)),
                        weight:624820
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9417669),
                        parseFloat(143.9410112)),
                        weight:224515
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5083939),
                        parseFloat(145.7474205)),
                        weight:625571
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1286977),
                        parseFloat(144.4148693)),
                        weight:604687
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5432323),
                        parseFloat(144.9931214)),
                        weight:561848
                        },

{location: new google.maps.LatLng(
                        parseFloat(-31.9407234),
                        parseFloat(115.8666955)),
                        weight:422693
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5986338),
                        parseFloat(145.8739293)),
                        weight:397187
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.18),
                        parseFloat(144.39)),
                        weight:367221
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7525662),
                        parseFloat(145.1350129)),
                        weight:1719723
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6669399),
                        parseFloat(144.5636846)),
                        weight:518442
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1303027),
                        parseFloat(147.9752136)),
                        weight:258750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6703725),
                        parseFloat(145.071113)),
                        weight:650458
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.82700000000001),
                        parseFloat(145.28)),
                        weight:590005
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3605915),
                        parseFloat(143.4159179)),
                        weight:447810
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3736745),
                        parseFloat(145.1261924)),
                        weight:487745
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9483706),
                        parseFloat(145.8463301)),
                        weight:578750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.162),
                        parseFloat(144.3802)),
                        weight:710822
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1425876),
                        parseFloat(145.9561793)),
                        weight:498441
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1636386),
                        parseFloat(145.9303651)),
                        weight:779933
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1352566),
                        parseFloat(146.5637493)),
                        weight:255863
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1713405),
                        parseFloat(147.218909)),
                        weight:299000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0453436),
                        parseFloat(145.1702424)),
                        weight:786250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5137333),
                        parseFloat(143.720308)),
                        weight:756092
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8255403),
                        parseFloat(144.6734013)),
                        weight:342861
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:430000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6968268),
                        parseFloat(145.3651672)),
                        weight:595000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.188),
                        parseFloat(145.153)),
                        weight:1017461
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.85124649999999),
                        parseFloat(144.4561033)),
                        weight:695247
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.83),
                        parseFloat(144.993)),
                        weight:743208
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1415988),
                        parseFloat(147.0136321)),
                        weight:675000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4468841),
                        parseFloat(146.2321651)),
                        weight:596554
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.15),
                        parseFloat(146.466667)),
                        weight:619492
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.121779),
                        parseFloat(145.374298)),
                        weight:579976
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0741983),
                        parseFloat(145.4261653)),
                        weight:506187
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.87523970000001),
                        parseFloat(145.1290575)),
                        weight:1714734
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9709927),
                        parseFloat(145.1485377)),
                        weight:728721
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6212636),
                        parseFloat(145.0115965)),
                        weight:390000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6187977),
                        parseFloat(145.0130097)),
                        weight:390000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9255978),
                        parseFloat(145.0951545)),
                        weight:920202
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.774),
                        parseFloat(145.588)),
                        weight:868111
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.616667),
                        parseFloat(144.1)),
                        weight:841937
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.74256829999999),
                        parseFloat(144.256582)),
                        weight:381417
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1429517),
                        parseFloat(147.8151071)),
                        weight:365000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1789186),
                        parseFloat(146.9518342)),
                        weight:150000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.815795),
                        parseFloat(144.9646665)),
                        weight:548693
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.538708),
                        parseFloat(143.7457289)),
                        weight:923792
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6598006),
                        parseFloat(144.9903018)),
                        weight:556666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.937),
                        parseFloat(145.009)),
                        weight:1634189
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.879426),
                        parseFloat(145.7113079)),
                        weight:483968
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.888682),
                        parseFloat(145.5750049)),
                        weight:696171
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3605915),
                        parseFloat(143.4159179)),
                        weight:288000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2977261),
                        parseFloat(146.1609645)),
                        weight:676094
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8485227),
                        parseFloat(144.3521811)),
                        weight:1009706
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:210000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.421111),
                        parseFloat(144.861111)),
                        weight:1522827
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.898805),
                        parseFloat(144.6197043)),
                        weight:249000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9308274),
                        parseFloat(146.6494473)),
                        weight:265000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8303689),
                        parseFloat(144.9796056)),
                        weight:562129
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9995418),
                        parseFloat(145.0940302)),
                        weight:1086741
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8459801),
                        parseFloat(144.0766524)),
                        weight:763394
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7670374),
                        parseFloat(144.9621035)),
                        weight:702061
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2792586),
                        parseFloat(143.5156517)),
                        weight:425695
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7383196),
                        parseFloat(144.8992556)),
                        weight:584892
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2516966),
                        parseFloat(141.8235525)),
                        weight:248000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.95),
                        parseFloat(145.085)),
                        weight:948033
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.737345),
                        parseFloat(145.1366924)),
                        weight:562500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7409649),
                        parseFloat(145.0683729)),
                        weight:863120
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9592436),
                        parseFloat(145.206837)),
                        weight:601831
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.915833),
                        parseFloat(142.511111)),
                        weight:430000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.627),
                        parseFloat(144.929)),
                        weight:540069
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3327981),
                        parseFloat(141.6503461)),
                        weight:60573
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.93),
                        parseFloat(145.301)),
                        weight:825694
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.802),
                        parseFloat(145.316)),
                        weight:686081
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.98798180000001),
                        parseFloat(143.319609)),
                        weight:412031
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.6709241),
                        parseFloat(144.0879034)),
                        weight:281250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2247017),
                        parseFloat(144.510853)),
                        weight:2245597
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.30661070000001),
                        parseFloat(145.0773591)),
                        weight:846425
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7133504),
                        parseFloat(144.6308543)),
                        weight:242000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.982),
                        parseFloat(145.314)),
                        weight:2263451
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8565882),
                        parseFloat(145.183373)),
                        weight:1287321
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6897235),
                        parseFloat(144.7167148)),
                        weight:621766
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3562379),
                        parseFloat(144.0773023)),
                        weight:445000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.786952),
                        parseFloat(145.380147)),
                        weight:509938
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.047),
                        parseFloat(145.137)),
                        weight:867840
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.891),
                        parseFloat(145.026)),
                        weight:1187334
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1180171),
                        parseFloat(145.3201794)),
                        weight:545810
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8226005),
                        parseFloat(145.0353696)),
                        weight:493657
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5006654),
                        parseFloat(145.2563077)),
                        weight:880132
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6724766),
                        parseFloat(143.1756455)),
                        weight:354500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2081387),
                        parseFloat(145.6019917)),
                        weight:261250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6858683),
                        parseFloat(145.0130302)),
                        weight:673780
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5844691),
                        parseFloat(144.2408874)),
                        weight:264056
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1169559),
                        parseFloat(143.7250526)),
                        weight:104634
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1089167),
                        parseFloat(145.1363374)),
                        weight:697531
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2380769),
                        parseFloat(142.908047)),
                        weight:245207
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9552943),
                        parseFloat(143.3494538)),
                        weight:147484
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5498),
                        parseFloat(145.4761)),
                        weight:810419
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.480278),
                        parseFloat(144.005)),
                        weight:465284
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.166667),
                        parseFloat(143.7)),
                        weight:296200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.419077),
                        parseFloat(146.2666008)),
                        weight:308125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.941),
                        parseFloat(145.103)),
                        weight:641673
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1496144),
                        parseFloat(144.1754128)),
                        weight:393916
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7946685),
                        parseFloat(144.818759)),
                        weight:646525
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1575347),
                        parseFloat(145.8697558)),
                        weight:249320
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.777),
                        parseFloat(145.461)),
                        weight:807127
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.638889),
                        parseFloat(145.195)),
                        weight:1059859
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.183333),
                        parseFloat(146.016667)),
                        weight:1123456
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.66527800000001),
                        parseFloat(146.688333)),
                        weight:645344
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.683333),
                        parseFloat(142.666667)),
                        weight:125067
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5621587),
                        parseFloat(143.8502556)),
                        weight:437250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.7243809),
                        parseFloat(142.3583441)),
                        weight:85282
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8567727),
                        parseFloat(145.5337363)),
                        weight:798750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.576389),
                        parseFloat(143.868889)),
                        weight:287383
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4402267),
                        parseFloat(143.4498966)),
                        weight:408861
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6050762),
                        parseFloat(146.0884242)),
                        weight:869062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0884579),
                        parseFloat(144.7554106)),
                        weight:677812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1144599),
                        parseFloat(145.0893126)),
                        weight:1149913
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2732078),
                        parseFloat(147.019899)),
                        weight:803125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.28333300000001),
                        parseFloat(146.166667)),
                        weight:549850
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3336714),
                        parseFloat(146.1400336)),
                        weight:980000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8154802),
                        parseFloat(144.1610974)),
                        weight:440000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0113631),
                        parseFloat(145.1324102)),
                        weight:323046
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.983),
                        parseFloat(145.0434)),
                        weight:1138549
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.44639129999999),
                        parseFloat(146.0378905)),
                        weight:740000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.588333),
                        parseFloat(143.699444)),
                        weight:797191
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0322669),
                        parseFloat(143.3014138)),
                        weight:590600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5188799),
                        parseFloat(146.6436701)),
                        weight:509132
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.264013),
                        parseFloat(146.2370535)),
                        weight:759500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.516667),
                        parseFloat(144.483333)),
                        weight:1248437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.364817),
                        parseFloat(144.7462904)),
                        weight:618310
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8622199),
                        parseFloat(144.3840601)),
                        weight:1434500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.905059),
                        parseFloat(146.900704)),
                        weight:410000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0999051),
                        parseFloat(145.6800684)),
                        weight:1106041
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.836),
                        parseFloat(145.124)),
                        weight:1105195
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.852),
                        parseFloat(144.998)),
                        weight:791457
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6748291),
                        parseFloat(144.2122356)),
                        weight:661875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7062465),
                        parseFloat(144.9161373)),
                        weight:656287
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1006308),
                        parseFloat(145.9163703)),
                        weight:1010780
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9028476),
                        parseFloat(144.7697782)),
                        weight:951654
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1047021),
                        parseFloat(144.1178262)),
                        weight:512500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7178929),
                        parseFloat(144.5618605)),
                        weight:412936
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0899186),
                        parseFloat(144.2847434)),
                        weight:1376899
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.10643510000001),
                        parseFloat(142.3372181)),
                        weight:70000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9470859),
                        parseFloat(144.7227565)),
                        weight:376875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7327512),
                        parseFloat(144.8238362)),
                        weight:547205
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.811776),
                        parseFloat(144.7087223)),
                        weight:1050000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3810122),
                        parseFloat(142.2292907)),
                        weight:1361626
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.714),
                        parseFloat(145.066)),
                        weight:845977
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1416129),
                        parseFloat(145.2935555)),
                        weight:415000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.735636),
                        parseFloat(144.6521937)),
                        weight:419572
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9684704),
                        parseFloat(141.0829427)),
                        weight:217250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.742),
                        parseFloat(145.053)),
                        weight:989220
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.698),
                        parseFloat(145.144)),
                        weight:1206380
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.308272),
                        parseFloat(145.7884151)),
                        weight:195000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8726442),
                        parseFloat(145.0247002)),
                        weight:618371
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1802756),
                        parseFloat(146.3182719)),
                        weight:461437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8799469),
                        parseFloat(144.311879)),
                        weight:705809
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3415784),
                        parseFloat(147.0076483)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0629034),
                        parseFloat(145.3442888)),
                        weight:550200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.649799),
                        parseFloat(143.7694626)),
                        weight:696558
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9014775),
                        parseFloat(144.5969292)),
                        weight:315000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7645428),
                        parseFloat(144.8312453)),
                        weight:653494
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.250278),
                        parseFloat(147.712222)),
                        weight:615312
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.70346),
                        parseFloat(144.2320179)),
                        weight:324833
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:325000
                        },

{location: new google.maps.LatLng(
                        parseFloat(43.87910249999999),
                        parseFloat(-103.4590667)),
                        weight:364062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4968714),
                        parseFloat(143.8073584)),
                        weight:367750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5648),
                        parseFloat(143.8822)),
                        weight:342728
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.866944),
                        parseFloat(145.083056)),
                        weight:1955836
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3243492),
                        parseFloat(141.395409)),
                        weight:49990
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7833035),
                        parseFloat(144.9277474)),
                        weight:586011
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9757588),
                        parseFloat(145.1226002)),
                        weight:716936
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8083033),
                        parseFloat(145.125759)),
                        weight:1110822
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.8256023),
                        parseFloat(146.134104)),
                        weight:837918
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2260077),
                        parseFloat(145.5690835)),
                        weight:264277
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.816111),
                        parseFloat(145.11)),
                        weight:1447989
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0832491),
                        parseFloat(145.4240252)),
                        weight:604637
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7665464),
                        parseFloat(144.9195584)),
                        weight:696235
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8849536),
                        parseFloat(145.0059691)),
                        weight:567999
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7138138),
                        parseFloat(143.5936688)),
                        weight:249500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4799767),
                        parseFloat(145.2328259)),
                        weight:537170
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.062),
                        parseFloat(145.12)),
                        weight:842806
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.708),
                        parseFloat(145.115)),
                        weight:816810
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7877787),
                        parseFloat(145.0002125)),
                        weight:1055149
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.80888900000001),
                        parseFloat(145.078889)),
                        weight:1000819
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9749174),
                        parseFloat(145.2581884)),
                        weight:795383
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.939),
                        parseFloat(145.031)),
                        weight:1104253
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9469933),
                        parseFloat(141.3200604)),
                        weight:400000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8470309),
                        parseFloat(144.0725362)),
                        weight:618398
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.741667),
                        parseFloat(144.863056)),
                        weight:823853
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.734),
                        parseFloat(145.116)),
                        weight:1041185
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8554995),
                        parseFloat(145.0206967)),
                        weight:974058
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4602532),
                        parseFloat(143.8508908)),
                        weight:1439375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6994841),
                        parseFloat(144.8803113)),
                        weight:585389
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1487254),
                        parseFloat(145.9063892)),
                        weight:588612
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.702),
                        parseFloat(144.767)),
                        weight:559393
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.745),
                        parseFloat(144.74)),
                        weight:629896
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.718),
                        parseFloat(144.919)),
                        weight:2252959
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8927437),
                        parseFloat(145.0410692)),
                        weight:632738
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.213),
                        parseFloat(145.315)),
                        weight:1728339
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5089391),
                        parseFloat(143.7747951)),
                        weight:416156
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.731),
                        parseFloat(145.1)),
                        weight:1138111
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:552940
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9224386),
                        parseFloat(145.0410079)),
                        weight:1364343
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.873),
                        parseFloat(144.993)),
                        weight:599796
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.518382),
                        parseFloat(145.3591263)),
                        weight:1066305
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6779426),
                        parseFloat(144.8843087)),
                        weight:662690
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.203),
                        parseFloat(145.231)),
                        weight:891738
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4193287),
                        parseFloat(146.606259)),
                        weight:646015
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.726234),
                        parseFloat(144.8813526)),
                        weight:689792
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.82593809999999),
                        parseFloat(145.0972417)),
                        weight:1045575
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3065561),
                        parseFloat(143.7952389)),
                        weight:630720
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.902081),
                        parseFloat(145.0410692)),
                        weight:1501429
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8173492),
                        parseFloat(144.8465361)),
                        weight:622408
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4648602),
                        parseFloat(148.7505879)),
                        weight:100000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0050906),
                        parseFloat(144.221785)),
                        weight:645780
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2678624),
                        parseFloat(143.3510486)),
                        weight:227343
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7832944),
                        parseFloat(144.9838466)),
                        weight:952573
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6203401),
                        parseFloat(145.2590707)),
                        weight:300300
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1992076),
                        parseFloat(147.4033451)),
                        weight:172114
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.539995),
                        parseFloat(148.1239027)),
                        weight:507500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.05),
                        parseFloat(145.252)),
                        weight:727774
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.489),
                        parseFloat(145.07)),
                        weight:819318
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.707),
                        parseFloat(145.18)),
                        weight:769593
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1548052),
                        parseFloat(147.7920514)),
                        weight:192750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.803),
                        parseFloat(145.002)),
                        weight:708511
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3182611),
                        parseFloat(145.8264786)),
                        weight:1156250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.7377901),
                        parseFloat(145.9087155)),
                        weight:854705
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.796),
                        parseFloat(148.531)),
                        weight:431739
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6089501),
                        parseFloat(145.5911028)),
                        weight:518506
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.687),
                        parseFloat(144.743)),
                        weight:1203367
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7787036),
                        parseFloat(144.9426083)),
                        weight:529120
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.502394),
                        parseFloat(143.8780526)),
                        weight:1243914
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7728857),
                        parseFloat(144.8018125)),
                        weight:639547
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.77800000000001),
                        parseFloat(145.214)),
                        weight:1442499
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8416709),
                        parseFloat(145.013845)),
                        weight:1033231
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:509189
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3964546),
                        parseFloat(146.6791007)),
                        weight:285500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6973477),
                        parseFloat(144.7811982)),
                        weight:689027
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8050529),
                        parseFloat(145.261757)),
                        weight:303343
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8823641),
                        parseFloat(144.5934827)),
                        weight:331000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6717),
                        parseFloat(145.6198)),
                        weight:781544
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7457735),
                        parseFloat(144.9384576)),
                        weight:965012
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8261072),
                        parseFloat(147.4388572)),
                        weight:235351
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.799883),
                        parseFloat(145.226877)),
                        weight:1183895
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.708),
                        parseFloat(145.083)),
                        weight:773666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.734),
                        parseFloat(144.772)),
                        weight:616297
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9137268),
                        parseFloat(143.8831737)),
                        weight:156625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8064051),
                        parseFloat(145.1586444)),
                        weight:970897
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2357462),
                        parseFloat(141.9566857)),
                        weight:45000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8347413),
                        parseFloat(145.1727369)),
                        weight:1082619
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.058333),
                        parseFloat(145.203611)),
                        weight:376815
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.808056),
                        parseFloat(145.113889)),
                        weight:1540153
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.20912),
                        parseFloat(146.1421265)),
                        weight:286681
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.333333),
                        parseFloat(143.95)),
                        weight:686625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0831709),
                        parseFloat(146.2745848)),
                        weight:772499
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8242935),
                        parseFloat(145.0829188)),
                        weight:1854126
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.833),
                        parseFloat(145.583)),
                        weight:3127300
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.866369),
                        parseFloat(147.9673981)),
                        weight:562760
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.801111),
                        parseFloat(144.978889)),
                        weight:1745802
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.954525),
                        parseFloat(145.1908285)),
                        weight:661429
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9048347),
                        parseFloat(145.1458611)),
                        weight:535675
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.818843),
                        parseFloat(144.3129238)),
                        weight:742500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.726),
                        parseFloat(144.96)),
                        weight:793879
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.713),
                        parseFloat(144.897)),
                        weight:945000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.36),
                        parseFloat(144.769)),
                        weight:1378210
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.727),
                        parseFloat(144.76)),
                        weight:717039
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4711528),
                        parseFloat(143.318772)),
                        weight:520000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8236211),
                        parseFloat(146.9766789)),
                        weight:641875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.762),
                        parseFloat(144.863)),
                        weight:766646
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.025),
                        parseFloat(145.104)),
                        weight:1204156
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.883333),
                        parseFloat(146)),
                        weight:354218
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.831111),
                        parseFloat(145.36)),
                        weight:1019418
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.352),
                        parseFloat(144.953)),
                        weight:2391640
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.878),
                        parseFloat(145.411)),
                        weight:762284
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.86),
                        parseFloat(145.314)),
                        weight:740790
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2456008),
                        parseFloat(145.4240988)),
                        weight:790125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.867),
                        parseFloat(145.103)),
                        weight:1155950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2930364),
                        parseFloat(144.9811479)),
                        weight:1528750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.83),
                        parseFloat(145.242)),
                        weight:960709
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.82902),
                        parseFloat(144.6479749)),
                        weight:462975
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7412988),
                        parseFloat(144.9666108)),
                        weight:944497
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7555238),
                        parseFloat(144.2634067)),
                        weight:507526
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.1869703),
                        parseFloat(143.3556015)),
                        weight:129929
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.726),
                        parseFloat(145.104)),
                        weight:911480
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.783),
                        parseFloat(145.385)),
                        weight:920450
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.785),
                        parseFloat(145.315)),
                        weight:969405
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0147634),
                        parseFloat(145.1305169)),
                        weight:1436862
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.91),
                        parseFloat(145.039)),
                        weight:882664
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7),
                        parseFloat(145.081)),
                        weight:889974
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4388545),
                        parseFloat(144.9883506)),
                        weight:331285
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4510835),
                        parseFloat(149.696092)),
                        weight:400000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7859028),
                        parseFloat(144.8587417)),
                        weight:1194159
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4339973),
                        parseFloat(146.3160003)),
                        weight:714250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0507405),
                        parseFloat(142.6941054)),
                        weight:180000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.77800000000001),
                        parseFloat(145.528)),
                        weight:527945
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.761389),
                        parseFloat(145.584444)),
                        weight:675312
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2178397),
                        parseFloat(141.6092063)),
                        weight:493953
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5423451),
                        parseFloat(144.9629782)),
                        weight:533778
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3790882),
                        parseFloat(145.8364124)),
                        weight:1225000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4804163),
                        parseFloat(144.9456929)),
                        weight:622438
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.600724),
                        parseFloat(144.713328)),
                        weight:477157
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8773116),
                        parseFloat(145.059272)),
                        weight:898978
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7525378),
                        parseFloat(145.6948397)),
                        weight:615621
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6687532),
                        parseFloat(145.8535353)),
                        weight:329375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.583333),
                        parseFloat(145.2)),
                        weight:1790662
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.726),
                        parseFloat(145.216)),
                        weight:1125898
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4146878),
                        parseFloat(145.473471)),
                        weight:535245
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0742262),
                        parseFloat(145.1431018)),
                        weight:806360
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8990236),
                        parseFloat(145.0923305)),
                        weight:914221
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.50398089999999),
                        parseFloat(141.4447402)),
                        weight:240000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.81),
                        parseFloat(145.343)),
                        weight:722149
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7450776),
                        parseFloat(148.3523807)),
                        weight:1209750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.05),
                        parseFloat(141.016667)),
                        weight:324997
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7117283),
                        parseFloat(141.5318089)),
                        weight:369343
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.048),
                        parseFloat(147.461)),
                        weight:175218
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7578477),
                        parseFloat(144.7913339)),
                        weight:595918
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9151442),
                        parseFloat(145.9302897)),
                        weight:375000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9752778),
                        parseFloat(147.1327778)),
                        weight:441135
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.77800000000001),
                        parseFloat(144.935)),
                        weight:738073
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.383333),
                        parseFloat(145.3)),
                        weight:429000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.633333),
                        parseFloat(143.566667)),
                        weight:219500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3926739),
                        parseFloat(144.0031194)),
                        weight:954968
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5668106),
                        parseFloat(143.7880096)),
                        weight:383622
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.722585),
                        parseFloat(143.406515)),
                        weight:274500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.686),
                        parseFloat(145.137)),
                        weight:1074016
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.914),
                        parseFloat(145.369)),
                        weight:969956
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.68298),
                        parseFloat(144.5500157)),
                        weight:525008
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8116106),
                        parseFloat(145.0693227)),
                        weight:980000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3950602),
                        parseFloat(146.1498411)),
                        weight:865000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0546115),
                        parseFloat(142.3436634)),
                        weight:363125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.86163570000001),
                        parseFloat(148.0384692)),
                        weight:411750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5287872),
                        parseFloat(145.6488124)),
                        weight:944500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9714618),
                        parseFloat(144.1501922)),
                        weight:555750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4349409),
                        parseFloat(146.3554145)),
                        weight:869093
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.746),
                        parseFloat(144.765)),
                        weight:568452
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.339),
                        parseFloat(145.175)),
                        weight:614726
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.948441),
                        parseFloat(143.2160297)),
                        weight:365218
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7181217),
                        parseFloat(146.4698925)),
                        weight:150000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.809),
                        parseFloat(144.878)),
                        weight:1100000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6464456),
                        parseFloat(143.7013326)),
                        weight:171250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.95),
                        parseFloat(145.541)),
                        weight:995537
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9767584),
                        parseFloat(145.5145727)),
                        weight:1754525
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.65),
                        parseFloat(144.922)),
                        weight:536339
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.144969),
                        parseFloat(145.8482917)),
                        weight:276250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.772),
                        parseFloat(145.066)),
                        weight:1021213
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2975183),
                        parseFloat(145.850207)),
                        weight:629750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8255403),
                        parseFloat(144.6734013)),
                        weight:316906
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9043383),
                        parseFloat(144.9931825)),
                        weight:1861280
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:347500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8321474),
                        parseFloat(145.0636941)),
                        weight:1563457
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.710964),
                        parseFloat(144.6931359)),
                        weight:360500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9982063),
                        parseFloat(145.4237893)),
                        weight:1291104
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4546886),
                        parseFloat(144.1113142)),
                        weight:456564
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8572432),
                        parseFloat(145.0341642)),
                        weight:3091683
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8604777),
                        parseFloat(141.7988033)),
                        weight:686812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.685),
                        parseFloat(145.538)),
                        weight:2786337
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.119),
                        parseFloat(145.2)),
                        weight:667523
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6941469),
                        parseFloat(147.1485394)),
                        weight:577968
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7702749),
                        parseFloat(144.7747728)),
                        weight:524564
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.606),
                        parseFloat(145.488)),
                        weight:721858
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9187107),
                        parseFloat(145.158814)),
                        weight:908816
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.533333),
                        parseFloat(145.466667)),
                        weight:1084375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8552118),
                        parseFloat(147.8992133)),
                        weight:311257
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4923219),
                        parseFloat(147.3583041)),
                        weight:375000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.081944),
                        parseFloat(145.575)),
                        weight:1447064
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.474),
                        parseFloat(145.022)),
                        weight:5806250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.838),
                        parseFloat(145.198)),
                        weight:1524745
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4684985),
                        parseFloat(146.8683621)),
                        weight:1100000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7013445),
                        parseFloat(145.1403897)),
                        weight:353900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.848518),
                        parseFloat(145.004785)),
                        weight:338950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:559627
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8759742),
                        parseFloat(145.0418672)),
                        weight:7950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5871532),
                        parseFloat(144.7481666)),
                        weight:286000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0175),
                        parseFloat(144.965278)),
                        weight:334750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4577308),
                        parseFloat(142.5942441)),
                        weight:105080
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4971056),
                        parseFloat(144.5968722)),
                        weight:400000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.5789203),
                        parseFloat(143.7748884)),
                        weight:755000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.854),
                        parseFloat(144.988)),
                        weight:483695
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.461),
                        parseFloat(144.905)),
                        weight:1065605
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.719167),
                        parseFloat(141.472778)),
                        weight:103750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.818),
                        parseFloat(145.366)),
                        weight:1014232
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5116349),
                        parseFloat(145.7696509)),
                        weight:999375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7755151),
                        parseFloat(144.8154448)),
                        weight:545063
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.715),
                        parseFloat(145.034)),
                        weight:1020066
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.715),
                        parseFloat(144.751)),
                        weight:666812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.157778),
                        parseFloat(146.015833)),
                        weight:210812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0675541),
                        parseFloat(145.2513623)),
                        weight:517200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.067202),
                        parseFloat(145.252756)),
                        weight:554612
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6144503),
                        parseFloat(142.4698649)),
                        weight:107708
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.86799999999999),
                        parseFloat(144.841)),
                        weight:1257949
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.183333),
                        parseFloat(146.466667)),
                        weight:730875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2951735),
                        parseFloat(146.6912281)),
                        weight:502075
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.02935),
                        parseFloat(146.1302674)),
                        weight:328244
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.633333),
                        parseFloat(144.116667)),
                        weight:252284
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5422738),
                        parseFloat(142.7368981)),
                        weight:146575
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7062908),
                        parseFloat(144.8948907)),
                        weight:685308
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4113541),
                        parseFloat(143.9793141)),
                        weight:209125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.411111),
                        parseFloat(145.761389)),
                        weight:810937
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4198646),
                        parseFloat(145.4457768)),
                        weight:874062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.5885119),
                        parseFloat(142.777553)),
                        weight:361878
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0779833),
                        parseFloat(146.9541617)),
                        weight:735000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.244444),
                        parseFloat(143.515556)),
                        weight:432500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4051772),
                        parseFloat(144.4013907)),
                        weight:974843
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5937109),
                        parseFloat(144.2077977)),
                        weight:685000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.82902),
                        parseFloat(144.6479749)),
                        weight:473066
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7529342),
                        parseFloat(144.2456637)),
                        weight:438769
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9085262),
                        parseFloat(145.1181383)),
                        weight:745780
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.048543),
                        parseFloat(145.322772)),
                        weight:772584
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.765821),
                        parseFloat(138.646565)),
                        weight:310000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.884),
                        parseFloat(145.0266)),
                        weight:816975
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1028369),
                        parseFloat(147.1693375)),
                        weight:867487
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7847993),
                        parseFloat(144.7786708)),
                        weight:566098
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3436308),
                        parseFloat(146.4104044)),
                        weight:523443
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0690534),
                        parseFloat(146.1623601)),
                        weight:808023
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8438609),
                        parseFloat(144.9514536)),
                        weight:1773044
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0175299),
                        parseFloat(144.3534486)),
                        weight:604858
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.493954),
                        parseFloat(145.325409)),
                        weight:914987
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5974169),
                        parseFloat(146.1700361)),
                        weight:520000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6978954),
                        parseFloat(144.5053764)),
                        weight:987250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8791959),
                        parseFloat(145.0444397)),
                        weight:794406
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.218),
                        parseFloat(144.367)),
                        weight:713586
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8296238),
                        parseFloat(145.3115843)),
                        weight:921830
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.683333),
                        parseFloat(143.566667)),
                        weight:310176
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.788805),
                        parseFloat(144.9719823)),
                        weight:1314853
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.891),
                        parseFloat(145.248)),
                        weight:866345
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2121658),
                        parseFloat(144.3640899)),
                        weight:523093
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3118233),
                        parseFloat(144.125661)),
                        weight:335745
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1970152),
                        parseFloat(145.0609455)),
                        weight:288750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:590254
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6672077),
                        parseFloat(144.9549288)),
                        weight:516049
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.398),
                        parseFloat(145.106)),
                        weight:1384660
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7644773),
                        parseFloat(145.0628446)),
                        weight:1840033
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.783657),
                        parseFloat(144.8375652)),
                        weight:882711
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.79999),
                        parseFloat(146.0640244)),
                        weight:1018250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.752695),
                        parseFloat(145.0703364)),
                        weight:772286
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.841944),
                        parseFloat(145.035)),
                        weight:715000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.813),
                        parseFloat(144.985)),
                        weight:1182112
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.419),
                        parseFloat(144.83)),
                        weight:1247626
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7822896),
                        parseFloat(142.997717)),
                        weight:202000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6736721),
                        parseFloat(144.3870348)),
                        weight:388372
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7114587),
                        parseFloat(147.691206)),
                        weight:516875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1097155),
                        parseFloat(145.9252773)),
                        weight:546400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1713818),
                        parseFloat(144.0531998)),
                        weight:648750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0126173),
                        parseFloat(146.4001308)),
                        weight:248293
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8292454),
                        parseFloat(144.8813515)),
                        weight:3124296
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3872318),
                        parseFloat(144.2067793)),
                        weight:405750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.09672520000001),
                        parseFloat(145.6030578)),
                        weight:361397
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.98502149999999),
                        parseFloat(146.1789907)),
                        weight:1079500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4220465),
                        parseFloat(143.960275)),
                        weight:1750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9806285),
                        parseFloat(142.2931785)),
                        weight:478418
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1897923),
                        parseFloat(144.7460094)),
                        weight:1186250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5423397),
                        parseFloat(144.7352292)),
                        weight:495000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0543565),
                        parseFloat(145.3285918)),
                        weight:470666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3913281),
                        parseFloat(146.2594033)),
                        weight:1339875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2643479),
                        parseFloat(141.6763239)),
                        weight:490000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9166667),
                        parseFloat(147.9166667)),
                        weight:575900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5461163),
                        parseFloat(146.1530661)),
                        weight:459000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1403799),
                        parseFloat(145.9511191)),
                        weight:581733
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4408598),
                        parseFloat(145.4083402)),
                        weight:144750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7175339),
                        parseFloat(144.5947643)),
                        weight:79750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7458317),
                        parseFloat(141.9352015)),
                        weight:237500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8057343),
                        parseFloat(143.2861142)),
                        weight:183500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8244116),
                        parseFloat(144.6736213)),
                        weight:329396
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.313056),
                        parseFloat(146.839167)),
                        weight:676046
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.648889),
                        parseFloat(145.371944)),
                        weight:574796
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.669),
                        parseFloat(145.117)),
                        weight:1705806
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2910882),
                        parseFloat(142.5953418)),
                        weight:766850
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0561029),
                        parseFloat(145.3964724)),
                        weight:475000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.216667),
                        parseFloat(141.783333)),
                        weight:455000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0026231),
                        parseFloat(144.5663247)),
                        weight:462644
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2342952),
                        parseFloat(145.897646)),
                        weight:395109
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.8508477),
                        parseFloat(143.1747947)),
                        weight:121875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1661839),
                        parseFloat(144.6996603)),
                        weight:616875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.189),
                        parseFloat(145.189)),
                        weight:1387063
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7625822),
                        parseFloat(145.3405593)),
                        weight:736650
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.044592),
                        parseFloat(142.8825176)),
                        weight:141500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6372041),
                        parseFloat(145.7141065)),
                        weight:402858
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:499900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.152069),
                        parseFloat(146.8124847)),
                        weight:390990
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1429091),
                        parseFloat(144.510853)),
                        weight:1300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2622769),
                        parseFloat(144.6092902)),
                        weight:1074991
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6980957),
                        parseFloat(145.8360275)),
                        weight:700000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8592043),
                        parseFloat(144.7704046)),
                        weight:525419
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6432507),
                        parseFloat(144.4930553)),
                        weight:578850
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.132),
                        parseFloat(145.293)),
                        weight:649600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5730551),
                        parseFloat(143.2709202)),
                        weight:55000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5743217),
                        parseFloat(143.2146832)),
                        weight:207000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.355833),
                        parseFloat(142.441389)),
                        weight:385885
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7355557),
                        parseFloat(145.2696895)),
                        weight:1573813
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1263346),
                        parseFloat(142.6824015)),
                        weight:975000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5848686),
                        parseFloat(142.581128)),
                        weight:650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.779),
                        parseFloat(145.606)),
                        weight:585215
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3691862),
                        parseFloat(145.9808134)),
                        weight:474000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5514088),
                        parseFloat(145.6540438)),
                        weight:1995000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.95),
                        parseFloat(146.4)),
                        weight:341935
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8991785),
                        parseFloat(145.230328)),
                        weight:748545
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6836771),
                        parseFloat(145.465844)),
                        weight:624900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.883),
                        parseFloat(145.372)),
                        weight:825173
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2156486),
                        parseFloat(145.8746249)),
                        weight:3600000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7448481),
                        parseFloat(145.6507039)),
                        weight:570656
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3774194),
                        parseFloat(143.2672147)),
                        weight:354324
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7927082),
                        parseFloat(144.7715559)),
                        weight:703029
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.755),
                        parseFloat(144.883)),
                        weight:1136816
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.686),
                        parseFloat(145.216)),
                        weight:2554892
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9418897),
                        parseFloat(145.0601819)),
                        weight:888743
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5329172),
                        parseFloat(144.1030857)),
                        weight:300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.575),
                        parseFloat(143.923)),
                        weight:1282500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8455722),
                        parseFloat(144.5910377)),
                        weight:365000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4130762),
                        parseFloat(145.7251956)),
                        weight:712500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.242203),
                        parseFloat(146.1700361)),
                        weight:612500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8521404),
                        parseFloat(144.5940978)),
                        weight:348000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.136111),
                        parseFloat(142.025)),
                        weight:147350
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4221835),
                        parseFloat(143.7120932)),
                        weight:370539
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8300643),
                        parseFloat(144.8703715)),
                        weight:915303
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.784),
                        parseFloat(144.966)),
                        weight:3400175
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.876),
                        parseFloat(144.758)),
                        weight:656414
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.68000000000001),
                        parseFloat(144.784)),
                        weight:4102500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6562333),
                        parseFloat(144.9364069)),
                        weight:499147
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.21386270000001),
                        parseFloat(145.339912)),
                        weight:606479
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3950636),
                        parseFloat(145.8892336)),
                        weight:897500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2006511),
                        parseFloat(142.9364881)),
                        weight:372500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.775),
                        parseFloat(145.266)),
                        weight:895751
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5174647),
                        parseFloat(145.7096128)),
                        weight:856062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7760414),
                        parseFloat(143.6840179)),
                        weight:269000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.2188002),
                        parseFloat(142.0301484)),
                        weight:503037
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.809929),
                        parseFloat(144.9815887)),
                        weight:577636
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3257637),
                        parseFloat(145.1531982)),
                        weight:494659
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4110218),
                        parseFloat(146.1823374)),
                        weight:650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:180000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2952728),
                        parseFloat(143.200883)),
                        weight:850000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.2076592),
                        parseFloat(142.2018502)),
                        weight:645649
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7200817),
                        parseFloat(144.8514577)),
                        weight:665743
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6097687),
                        parseFloat(143.937236)),
                        weight:480000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7539679),
                        parseFloat(144.225878)),
                        weight:879000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.734),
                        parseFloat(145.45)),
                        weight:1350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.6392202),
                        parseFloat(142.9909246)),
                        weight:107250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2582684),
                        parseFloat(145.1023552)),
                        weight:1334500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9997175),
                        parseFloat(141.0999227)),
                        weight:130000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6882095),
                        parseFloat(143.8780526)),
                        weight:832500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.182),
                        parseFloat(145.575)),
                        weight:1607900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7098029),
                        parseFloat(145.0307349)),
                        weight:350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.7101801),
                        parseFloat(143.7098032)),
                        weight:841185
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8177196),
                        parseFloat(147.8044654)),
                        weight:223890
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.824),
                        parseFloat(145.421)),
                        weight:1188281
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0906202),
                        parseFloat(141.055046)),
                        weight:151750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.666),
                        parseFloat(144.887)),
                        weight:863967
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5828157),
                        parseFloat(146.1623601)),
                        weight:724750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.182),
                        parseFloat(144.375)),
                        weight:544978
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4262018),
                        parseFloat(144.2866151)),
                        weight:1433750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.769),
                        parseFloat(145.411)),
                        weight:854630
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.453243),
                        parseFloat(142.0290523)),
                        weight:277315
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.895),
                        parseFloat(145.31)),
                        weight:708344
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6436473),
                        parseFloat(146.4936982)),
                        weight:393500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9622534),
                        parseFloat(144.3457864)),
                        weight:823003
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3529876),
                        parseFloat(147.2190598)),
                        weight:461485
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8832037),
                        parseFloat(144.5961572)),
                        weight:521672
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.735636),
                        parseFloat(144.6521937)),
                        weight:463788
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.770885),
                        parseFloat(146.073309)),
                        weight:550000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8732814),
                        parseFloat(144.6206391)),
                        weight:466825
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3147502),
                        parseFloat(144.1474662)),
                        weight:1004412
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.885),
                        parseFloat(145.36)),
                        weight:1628296
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4967919),
                        parseFloat(144.6087925)),
                        weight:353601
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1878175),
                        parseFloat(143.4682535)),
                        weight:235750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7000901),
                        parseFloat(144.7267757)),
                        weight:549824
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1653745),
                        parseFloat(144.4138993)),
                        weight:450000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.83115069999999),
                        parseFloat(144.7309063)),
                        weight:600600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1814401),
                        parseFloat(145.8134331)),
                        weight:972156
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8255403),
                        parseFloat(144.6734013)),
                        weight:566163
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.923),
                        parseFloat(145.34)),
                        weight:419416
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.581111),
                        parseFloat(144.713889)),
                        weight:365985
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8461361),
                        parseFloat(144.7404177)),
                        weight:362166
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6779656),
                        parseFloat(141.8453393)),
                        weight:49027
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.925),
                        parseFloat(145.481944)),
                        weight:744661
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:364250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.819754),
                        parseFloat(144.9565437)),
                        weight:639400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5655556),
                        parseFloat(144.6916667)),
                        weight:392500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7682554),
                        parseFloat(144.0378201)),
                        weight:365926
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.906),
                        parseFloat(145.344)),
                        weight:561622
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.774446),
                        parseFloat(144.9443341)),
                        weight:678245
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.17),
                        parseFloat(144.381)),
                        weight:414540
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.399794),
                        parseFloat(145.321315)),
                        weight:37000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.87),
                        parseFloat(145.353889)),
                        weight:878608
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5763432),
                        parseFloat(144.7335675)),
                        weight:392900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4706909),
                        parseFloat(144.9907946)),
                        weight:507579
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6229982),
                        parseFloat(144.7047804)),
                        weight:496150
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:394620
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.82205829999999),
                        parseFloat(144.9662423)),
                        weight:502037
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.338889),
                        parseFloat(144.740833)),
                        weight:1537917
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.383333),
                        parseFloat(145.4)),
                        weight:155000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.7385962),
                        parseFloat(143.6894419)),
                        weight:30000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6913572),
                        parseFloat(144.6596639)),
                        weight:858770
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.66800000000001),
                        parseFloat(144.94)),
                        weight:508575
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7125989),
                        parseFloat(147.7913421)),
                        weight:463000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1185054),
                        parseFloat(144.1011374)),
                        weight:195000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.378342),
                        parseFloat(141.2371583)),
                        weight:150312
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8305164),
                        parseFloat(144.9734319)),
                        weight:587142
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.570013),
                        parseFloat(143.7989997)),
                        weight:425724
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.51489979999999),
                        parseFloat(146.5518033)),
                        weight:650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8),
                        parseFloat(147.483333)),
                        weight:634821
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7764151),
                        parseFloat(142.7171844)),
                        weight:129000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7605268),
                        parseFloat(145.2452567)),
                        weight:1887281
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.033333),
                        parseFloat(145.9)),
                        weight:1340250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7500523),
                        parseFloat(146.8796103)),
                        weight:529000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.048056),
                        parseFloat(143.816944)),
                        weight:396498
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.64),
                        parseFloat(145.133)),
                        weight:2109233
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2732767),
                        parseFloat(144.6129756)),
                        weight:845000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.957222),
                        parseFloat(144.370556)),
                        weight:167500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4178071),
                        parseFloat(143.4783871)),
                        weight:419000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.776141),
                        parseFloat(143.6583166)),
                        weight:1009531
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7816741),
                        parseFloat(142.1638346)),
                        weight:350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7847993),
                        parseFloat(144.7786708)),
                        weight:589715
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2179247),
                        parseFloat(145.4293879)),
                        weight:325663
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5990447),
                        parseFloat(144.9934997)),
                        weight:546010
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.710964),
                        parseFloat(144.6931359)),
                        weight:514141
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.715637),
                        parseFloat(144.685993)),
                        weight:393141
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.216667),
                        parseFloat(143.566667)),
                        weight:382500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7135193),
                        parseFloat(147.8339017)),
                        weight:278229
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.916667),
                        parseFloat(144.25)),
                        weight:714218
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.4334504),
                        parseFloat(143.6211297)),
                        weight:242550
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8138885),
                        parseFloat(144.9621516)),
                        weight:580050
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9193714),
                        parseFloat(145.6629059)),
                        weight:362000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7201734),
                        parseFloat(143.2978752)),
                        weight:118093
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6921798),
                        parseFloat(144.7151455)),
                        weight:342000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5988034),
                        parseFloat(146.2475293)),
                        weight:235500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.966667),
                        parseFloat(145.95)),
                        weight:787250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:324000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1288008),
                        parseFloat(145.2870179)),
                        weight:418000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6772676),
                        parseFloat(144.4163259)),
                        weight:374666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:343918
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7937398),
                        parseFloat(144.8985171)),
                        weight:263650
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8432214),
                        parseFloat(144.6381133)),
                        weight:317400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.7178452),
                        parseFloat(143.1040248)),
                        weight:123750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.132222),
                        parseFloat(144.619722)),
                        weight:2276562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7343937),
                        parseFloat(148.0867723)),
                        weight:424250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6770462),
                        parseFloat(141.6419409)),
                        weight:65000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.07216),
                        parseFloat(146.0082778)),
                        weight:1019062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1923975),
                        parseFloat(141.5430708)),
                        weight:239950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.354),
                        parseFloat(145.075)),
                        weight:4143750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.183333),
                        parseFloat(144.433333)),
                        weight:868930
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4126671),
                        parseFloat(145.4526995)),
                        weight:367500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2605102),
                        parseFloat(145.8349846)),
                        weight:570125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5406616),
                        parseFloat(144.9557365)),
                        weight:513150
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9074344),
                        parseFloat(145.1086176)),
                        weight:738350
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.806484),
                        parseFloat(144.982427)),
                        weight:392800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9756695),
                        parseFloat(146.3768277)),
                        weight:318000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9143894),
                        parseFloat(141.2730001)),
                        weight:381718
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.734),
                        parseFloat(145.383)),
                        weight:771964
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.265189),
                        parseFloat(146.4851099)),
                        weight:557923
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7216385),
                        parseFloat(144.376119)),
                        weight:1373750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4606838),
                        parseFloat(145.2543291)),
                        weight:485515
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5207531),
                        parseFloat(144.0830163)),
                        weight:1149500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1754934),
                        parseFloat(146.2569585)),
                        weight:649000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5412601),
                        parseFloat(144.8913085)),
                        weight:348500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9316623),
                        parseFloat(143.600774)),
                        weight:124500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.8544278),
                        parseFloat(144.1754128)),
                        weight:4100000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4312045),
                        parseFloat(146.5425534)),
                        weight:364000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3551321),
                        parseFloat(145.24696)),
                        weight:290000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1467949),
                        parseFloat(146.4489704)),
                        weight:449004
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1374717),
                        parseFloat(147.0837049)),
                        weight:470562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2677746),
                        parseFloat(144.6286897)),
                        weight:1526137
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9001275),
                        parseFloat(143.1134295)),
                        weight:99765
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.5250292),
                        parseFloat(143.9539977)),
                        weight:319687
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.59400000000001),
                        parseFloat(145.374)),
                        weight:1188000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5671987),
                        parseFloat(143.78883)),
                        weight:382726
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3257637),
                        parseFloat(145.1531982)),
                        weight:652550
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6414809),
                        parseFloat(146.8474204)),
                        weight:795000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3367162),
                        parseFloat(142.7352451)),
                        weight:629416
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.099),
                        parseFloat(144.373)),
                        weight:575039
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6803624),
                        parseFloat(144.9192491)),
                        weight:399000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.866435),
                        parseFloat(144.2080832)),
                        weight:908150
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6801239),
                        parseFloat(145.9382944)),
                        weight:572850
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5016289),
                        parseFloat(145.272887)),
                        weight:686913
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.019),
                        parseFloat(145.551)),
                        weight:2118750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7695286),
                        parseFloat(144.0887418)),
                        weight:1350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(44.3155772),
                        parseFloat(-69.8040678)),
                        weight:563066
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7405115),
                        parseFloat(144.665566)),
                        weight:524779
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2872903),
                        parseFloat(142.4305627)),
                        weight:620000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.754),
                        parseFloat(145.045)),
                        weight:889722
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6790443),
                        parseFloat(143.3750878)),
                        weight:648750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.7043519),
                        parseFloat(146.087727)),
                        weight:983915
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.999),
                        parseFloat(145.344)),
                        weight:993866
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4082948),
                        parseFloat(143.7023491)),
                        weight:715150
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3217802),
                        parseFloat(145.5204241)),
                        weight:878437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.453056),
                        parseFloat(145.264722)),
                        weight:3985491
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3190608),
                        parseFloat(145.3288655)),
                        weight:435996
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.53158579999999),
                        parseFloat(145.3456866)),
                        weight:413212
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8128177),
                        parseFloat(144.9707255)),
                        weight:592535
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6),
                        parseFloat(141.7)),
                        weight:295564
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7322467),
                        parseFloat(147.5893027)),
                        weight:209000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5919774),
                        parseFloat(145.2811778)),
                        weight:1896422
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4371546),
                        parseFloat(143.3915186)),
                        weight:74426
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.94),
                        parseFloat(145.356)),
                        weight:1286273
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.761389),
                        parseFloat(146.984167)),
                        weight:808159
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.935171),
                        parseFloat(141.9652923)),
                        weight:249000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.616667),
                        parseFloat(144.333333)),
                        weight:1392250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3862675),
                        parseFloat(143.905224)),
                        weight:302035
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1432659),
                        parseFloat(144.2549754)),
                        weight:428007
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.7010374),
                        parseFloat(145.8305585)),
                        weight:380000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3564109),
                        parseFloat(143.8858478)),
                        weight:46696
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9897827),
                        parseFloat(141.2116368)),
                        weight:96766
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.7337783),
                        parseFloat(144.0196288)),
                        weight:360000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0030557),
                        parseFloat(145.1004084)),
                        weight:307500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.85599),
                        parseFloat(145.364357)),
                        weight:730127
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.39),
                        parseFloat(146.449722)),
                        weight:633750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.027044),
                        parseFloat(142.0046427)),
                        weight:148800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.132),
                        parseFloat(144.354)),
                        weight:872875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5671987),
                        parseFloat(143.78883)),
                        weight:447314
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9318234),
                        parseFloat(147.2007191)),
                        weight:38000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5622497),
                        parseFloat(142.0690586)),
                        weight:105250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3976961),
                        parseFloat(144.8727103)),
                        weight:182000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3629556),
                        parseFloat(143.6400336)),
                        weight:322250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6150597),
                        parseFloat(145.2915424)),
                        weight:899000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.12355489999999),
                        parseFloat(144.3562807)),
                        weight:1307521
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7465869),
                        parseFloat(143.6312323)),
                        weight:398750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0034676),
                        parseFloat(145.5025595)),
                        weight:1508979
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.016667),
                        parseFloat(145.466667)),
                        weight:281213
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6172482),
                        parseFloat(143.9269679)),
                        weight:630000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.582508),
                        parseFloat(144.7604827)),
                        weight:570804
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1556929),
                        parseFloat(146.1923698)),
                        weight:935000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.762),
                        parseFloat(144.901)),
                        weight:1456885
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.336413),
                        parseFloat(141.4170098)),
                        weight:359875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7153916),
                        parseFloat(145.1479323)),
                        weight:130000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5370029),
                        parseFloat(145.6918687)),
                        weight:720000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1673819),
                        parseFloat(144.3658474)),
                        weight:774303
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.36911500000001),
                        parseFloat(144.986205)),
                        weight:105000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4869435),
                        parseFloat(144.8065219)),
                        weight:1687500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1283598),
                        parseFloat(143.79049)),
                        weight:340437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0012974),
                        parseFloat(144.4937398)),
                        weight:1695937
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.3),
                        parseFloat(142.15)),
                        weight:353656
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4610555),
                        parseFloat(146.7082159)),
                        weight:524750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.355122),
                        parseFloat(146.3272848)),
                        weight:160000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3805015),
                        parseFloat(145.5503685)),
                        weight:341000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5461163),
                        parseFloat(146.1530661)),
                        weight:165000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8461361),
                        parseFloat(144.7404177)),
                        weight:610212
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.701411),
                        parseFloat(143.9813542)),
                        weight:666500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6937488),
                        parseFloat(143.7720708)),
                        weight:895000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5586809),
                        parseFloat(146.262896)),
                        weight:885875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1875016),
                        parseFloat(146.4703219)),
                        weight:735000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0084966),
                        parseFloat(143.1336987)),
                        weight:164484
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:310000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.233333),
                        parseFloat(147.033333)),
                        weight:484216
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0206756),
                        parseFloat(145.7182515)),
                        weight:1294500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.133333),
                        parseFloat(144.35)),
                        weight:850000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5385525),
                        parseFloat(146.4730429)),
                        weight:545000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5083135),
                        parseFloat(142.8994409)),
                        weight:400350
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8288281),
                        parseFloat(145.2573736)),
                        weight:224375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.323816),
                        parseFloat(146.5796363)),
                        weight:364093
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.1707397),
                        parseFloat(141.808038)),
                        weight:63081
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1313547),
                        parseFloat(145.3089116)),
                        weight:531050
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.673863),
                        parseFloat(145.4838586)),
                        weight:450312
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1966523),
                        parseFloat(147.9023498)),
                        weight:219005
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7470069),
                        parseFloat(144.6792443)),
                        weight:492500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.216389),
                        parseFloat(145.689722)),
                        weight:412500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.6072876),
                        parseFloat(142.5809131)),
                        weight:24166
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9311827),
                        parseFloat(147.6141587)),
                        weight:622800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2804685),
                        parseFloat(144.5320784)),
                        weight:268289
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0924737),
                        parseFloat(145.3488118)),
                        weight:526918
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1097155),
                        parseFloat(145.9252773)),
                        weight:366887
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.581),
                        parseFloat(143.853)),
                        weight:539910
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1413053),
                        parseFloat(146.2202946)),
                        weight:424500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.162),
                        parseFloat(145.303)),
                        weight:1247250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8216131),
                        parseFloat(144.7106945)),
                        weight:409922
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8863058),
                        parseFloat(146.7854467)),
                        weight:329575
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2602668),
                        parseFloat(145.8216946)),
                        weight:733500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3584909),
                        parseFloat(146.3212664)),
                        weight:168058
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8432214),
                        parseFloat(144.6381133)),
                        weight:305925
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5121541),
                        parseFloat(148.165845)),
                        weight:413937
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3416551),
                        parseFloat(145.902453)),
                        weight:1524500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8985203),
                        parseFloat(144.5978531)),
                        weight:315583
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9404173),
                        parseFloat(144.2850068)),
                        weight:558858
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5251977),
                        parseFloat(144.6067252)),
                        weight:425125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5107295),
                        parseFloat(144.6041448)),
                        weight:568700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9924666),
                        parseFloat(145.0928)),
                        weight:250000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2468803),
                        parseFloat(143.5503753)),
                        weight:139000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.6196211),
                        parseFloat(143.912358)),
                        weight:480000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5351183),
                        parseFloat(144.9114571)),
                        weight:558359
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8784934),
                        parseFloat(144.9956077)),
                        weight:530500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7261823),
                        parseFloat(144.7081121)),
                        weight:533742
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9065246),
                        parseFloat(144.3016359)),
                        weight:296875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.098056),
                        parseFloat(147.058889)),
                        weight:486125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7002209),
                        parseFloat(145.3582514)),
                        weight:2200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1132303),
                        parseFloat(143.7261205)),
                        weight:502725
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.848617),
                        parseFloat(144.5885631)),
                        weight:306500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8481961),
                        parseFloat(144.5938671)),
                        weight:338000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.34998909999999),
                        parseFloat(143.5094722)),
                        weight:650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0145003),
                        parseFloat(143.6111837)),
                        weight:500550
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.027222),
                        parseFloat(143.677778)),
                        weight:474825
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7996663),
                        parseFloat(144.8973618)),
                        weight:384216
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7602995),
                        parseFloat(145.7474205)),
                        weight:805000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.883),
                        parseFloat(145.477)),
                        weight:2615417
                        },

{location: new google.maps.LatLng(
                        parseFloat(-27.83657),
                        parseFloat(153.329612)),
                        weight:560985
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2582022),
                        parseFloat(145.5525484)),
                        weight:375000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2989768),
                        parseFloat(147.2762157)),
                        weight:105000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1262305),
                        parseFloat(145.2361721)),
                        weight:580150
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0557415),
                        parseFloat(145.4824736)),
                        weight:650225
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.443056),
                        parseFloat(143.876111)),
                        weight:1313828
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0549166),
                        parseFloat(145.3122755)),
                        weight:342250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1356779),
                        parseFloat(143.3391976)),
                        weight:170000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3557749),
                        parseFloat(143.695912)),
                        weight:147500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.900833),
                        parseFloat(141.997222)),
                        weight:101171
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.363981),
                        parseFloat(146.0207222)),
                        weight:1054062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3451308),
                        parseFloat(142.308467)),
                        weight:399000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-31.39211629999999),
                        parseFloat(150.2548029)),
                        weight:625744
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9182683),
                        parseFloat(143.7965958)),
                        weight:482362
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0120101),
                        parseFloat(145.6275226)),
                        weight:726981
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.192222),
                        parseFloat(142.608889)),
                        weight:664562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0306894),
                        parseFloat(145.805379)),
                        weight:1157500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1062352),
                        parseFloat(145.330872)),
                        weight:520341
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8510291),
                        parseFloat(145.3411893)),
                        weight:55000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7497195),
                        parseFloat(144.308597)),
                        weight:513800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3257637),
                        parseFloat(145.1531982)),
                        weight:530098
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7604344),
                        parseFloat(145.5710076)),
                        weight:209000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3460579),
                        parseFloat(144.6717499)),
                        weight:485500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.933333),
                        parseFloat(145.55)),
                        weight:394812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7128105),
                        parseFloat(144.3122204)),
                        weight:996667
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5029337),
                        parseFloat(143.8400287)),
                        weight:922500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1802397),
                        parseFloat(145.1474292)),
                        weight:587191
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0309443),
                        parseFloat(145.3437469)),
                        weight:877727
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9036036),
                        parseFloat(144.6582659)),
                        weight:796694
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.158615),
                        parseFloat(144.548921)),
                        weight:743179
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0611204),
                        parseFloat(145.415089)),
                        weight:330000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8970666),
                        parseFloat(146.2620743)),
                        weight:449000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6001301),
                        parseFloat(145.6108835)),
                        weight:498735
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3673463),
                        parseFloat(144.2920769)),
                        weight:882000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2173608),
                        parseFloat(141.7053755)),
                        weight:303719
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1704499),
                        parseFloat(145.9720608)),
                        weight:1404375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4737441),
                        parseFloat(145.3917982)),
                        weight:640000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2426543),
                        parseFloat(144.3811681)),
                        weight:577317
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6687932),
                        parseFloat(144.5488973)),
                        weight:468592
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6687932),
                        parseFloat(144.5488973)),
                        weight:466690
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6523225),
                        parseFloat(144.5741727)),
                        weight:442790
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.369287),
                        parseFloat(143.2714994)),
                        weight:155000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.608056),
                        parseFloat(144.593056)),
                        weight:1548500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2962142),
                        parseFloat(143.5256956)),
                        weight:433937
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5169122),
                        parseFloat(145.2431847)),
                        weight:359375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7768707),
                        parseFloat(144.5040073)),
                        weight:430968
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5330704),
                        parseFloat(145.906628)),
                        weight:1372500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6155727),
                        parseFloat(143.6339403)),
                        weight:539000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4999437),
                        parseFloat(145.3357789)),
                        weight:453562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6965521),
                        parseFloat(144.7228471)),
                        weight:401900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.7724872),
                        parseFloat(144.0381604)),
                        weight:460000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3024721),
                        parseFloat(143.6884592)),
                        weight:589000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2215642),
                        parseFloat(144.3512575)),
                        weight:433537
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.364817),
                        parseFloat(144.7462904)),
                        weight:696040
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7216561),
                        parseFloat(144.5732966)),
                        weight:480031
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.673366),
                        parseFloat(145.6134893)),
                        weight:445000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5991822),
                        parseFloat(144.7540864)),
                        weight:505953
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:471850
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2386755),
                        parseFloat(145.758535)),
                        weight:1257500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6122125),
                        parseFloat(144.90744)),
                        weight:422000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.266667),
                        parseFloat(144.633333)),
                        weight:1700000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6679226),
                        parseFloat(144.4165678)),
                        weight:298416
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6662446),
                        parseFloat(144.4152142)),
                        weight:327750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3220322),
                        parseFloat(142.8479255)),
                        weight:490812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.169661),
                        parseFloat(143.6285036)),
                        weight:169000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3853254),
                        parseFloat(145.0438252)),
                        weight:950090
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.386944),
                        parseFloat(144.446111)),
                        weight:683765
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5522052),
                        parseFloat(145.6294143)),
                        weight:940000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7891316),
                        parseFloat(144.922894)),
                        weight:973116
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3171971),
                        parseFloat(142.7587443)),
                        weight:395625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0266674),
                        parseFloat(145.2576892)),
                        weight:997500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.685556),
                        parseFloat(143.938889)),
                        weight:828750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5783046),
                        parseFloat(146.3785017)),
                        weight:610437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.601963),
                        parseFloat(144.9861145)),
                        weight:284900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:293400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.851396),
                        parseFloat(145.7249828)),
                        weight:618000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.166667),
                        parseFloat(143.383333)),
                        weight:184125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.73314999999999),
                        parseFloat(144.6521281)),
                        weight:402542
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.692889),
                        parseFloat(144.720901)),
                        weight:422329
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7135734),
                        parseFloat(144.5571746)),
                        weight:419770
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6280474),
                        parseFloat(146.7204985)),
                        weight:709765
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.406137),
                        parseFloat(142.5462372)),
                        weight:250312
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1799126),
                        parseFloat(146.5477399)),
                        weight:207000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1140626),
                        parseFloat(146.9077363)),
                        weight:318000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1973138),
                        parseFloat(146.0987923)),
                        weight:1518750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5206202),
                        parseFloat(146.8950786)),
                        weight:775324
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6275666),
                        parseFloat(143.8508908)),
                        weight:820000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:358046
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5837958),
                        parseFloat(143.8021455)),
                        weight:447371
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.145278),
                        parseFloat(145.605833)),
                        weight:1031875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5236148),
                        parseFloat(144.3016359)),
                        weight:447968
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7551182),
                        parseFloat(144.4232713)),
                        weight:400000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2365),
                        parseFloat(145.2212)),
                        weight:775175
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8363648),
                        parseFloat(144.3938706)),
                        weight:1140937
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.281667),
                        parseFloat(143.465556)),
                        weight:1007500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3669582),
                        parseFloat(145.9454696)),
                        weight:695000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.596576),
                        parseFloat(143.824255)),
                        weight:368404
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2988444),
                        parseFloat(144.9282067)),
                        weight:240000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.345249),
                        parseFloat(144.9092023)),
                        weight:240000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8517597),
                        parseFloat(144.8689963)),
                        weight:874531
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4790153),
                        parseFloat(146.6426181)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1708854),
                        parseFloat(144.0902405)),
                        weight:730000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.05),
                        parseFloat(146.616667)),
                        weight:620880
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8263691),
                        parseFloat(144.6706196)),
                        weight:334125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3630117),
                        parseFloat(142.7980853)),
                        weight:293500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.563),
                        parseFloat(143.866)),
                        weight:732065
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4661814),
                        parseFloat(145.8470086)),
                        weight:650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4256676),
                        parseFloat(145.5323505)),
                        weight:230000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.683333),
                        parseFloat(146.283333)),
                        weight:272000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3160872),
                        parseFloat(145.7316571)),
                        weight:499000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.747013),
                        parseFloat(143.3238806)),
                        weight:750750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:435910
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0007918),
                        parseFloat(145.6197031)),
                        weight:289250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4156331),
                        parseFloat(145.4004785)),
                        weight:498450
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6707686),
                        parseFloat(142.5338611)),
                        weight:295493
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6447955),
                        parseFloat(145.1008364)),
                        weight:403750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.65),
                        parseFloat(142.35)),
                        weight:812105
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9),
                        parseFloat(145.333333)),
                        weight:232250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8042581),
                        parseFloat(142.0355956)),
                        weight:330000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5986077),
                        parseFloat(141.4775662)),
                        weight:274500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.024348),
                        parseFloat(145.9588312)),
                        weight:387437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.061873),
                        parseFloat(145.3589876)),
                        weight:559062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.483333),
                        parseFloat(145.283333)),
                        weight:785000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5271333),
                        parseFloat(143.5453035)),
                        weight:492828
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5381814),
                        parseFloat(144.533448)),
                        weight:360000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8461361),
                        parseFloat(144.7404177)),
                        weight:340500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.3255017),
                        parseFloat(143.540088)),
                        weight:716375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3912224),
                        parseFloat(144.120451)),
                        weight:59000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2653285),
                        parseFloat(145.5717496)),
                        weight:298000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7731846),
                        parseFloat(147.0302412)),
                        weight:393000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2828086),
                        parseFloat(145.9170662)),
                        weight:1050000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.316667),
                        parseFloat(142.466667)),
                        weight:960000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.366667),
                        parseFloat(144.05)),
                        weight:829437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3006634),
                        parseFloat(145.0665658)),
                        weight:501250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:423833
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5183602),
                        parseFloat(143.4196309)),
                        weight:450000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0394881),
                        parseFloat(145.0383133)),
                        weight:400968
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5315868),
                        parseFloat(145.0693227)),
                        weight:416414
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4852387),
                        parseFloat(142.8476761)),
                        weight:360000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9239278),
                        parseFloat(145.0818342)),
                        weight:470000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3464064),
                        parseFloat(145.9045405)),
                        weight:437375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7894568),
                        parseFloat(148.0505559)),
                        weight:633007
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.604118),
                        parseFloat(144.446526)),
                        weight:3318750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0500963),
                        parseFloat(144.3077816)),
                        weight:472875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4130869),
                        parseFloat(143.9351234)),
                        weight:1225000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6161538),
                        parseFloat(144.9079969)),
                        weight:509000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:258125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.816667),
                        parseFloat(145.65)),
                        weight:1176250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.417287),
                        parseFloat(145.007146)),
                        weight:466000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6191008),
                        parseFloat(142.9961352)),
                        weight:787745
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3),
                        parseFloat(145.116667)),
                        weight:731250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.283333),
                        parseFloat(144.5)),
                        weight:1258750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9833179),
                        parseFloat(142.9145594)),
                        weight:89225
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.581127),
                        parseFloat(142.8618737)),
                        weight:522500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0693505),
                        parseFloat(144.1537927)),
                        weight:648168
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4233265),
                        parseFloat(145.6474522)),
                        weight:305000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:320310
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7728183),
                        parseFloat(143.9085663)),
                        weight:235000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0848679),
                        parseFloat(145.4281923)),
                        weight:588600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2294442),
                        parseFloat(145.0660597)),
                        weight:564800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4659346),
                        parseFloat(145.4755485)),
                        weight:666494
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2557597),
                        parseFloat(142.6844137)),
                        weight:142250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5323804),
                        parseFloat(144.9632374)),
                        weight:432889
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9162161),
                        parseFloat(144.652404)),
                        weight:649997
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.303611),
                        parseFloat(144.090556)),
                        weight:995000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7625013),
                        parseFloat(145.999449)),
                        weight:720000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6323013),
                        parseFloat(144.8800506)),
                        weight:351000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3318362),
                        parseFloat(144.1965497)),
                        weight:703750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8520512),
                        parseFloat(145.3399273)),
                        weight:682500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7704954),
                        parseFloat(144.7611153)),
                        weight:580000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0711365),
                        parseFloat(145.5739362)),
                        weight:471250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.55),
                        parseFloat(145.266667)),
                        weight:1020100
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4399934),
                        parseFloat(145.0603633)),
                        weight:360000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1082873),
                        parseFloat(146.2411224)),
                        weight:4640862
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.066667),
                        parseFloat(145.933333)),
                        weight:657500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.622),
                        parseFloat(145.219)),
                        weight:647456
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9635423),
                        parseFloat(145.0827598)),
                        weight:482500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.735677),
                        parseFloat(145.0854815)),
                        weight:170000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0632272),
                        parseFloat(144.2456637)),
                        weight:825000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3),
                        parseFloat(144.383333)),
                        weight:1172500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7216561),
                        parseFloat(144.5732966)),
                        weight:271250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4841221),
                        parseFloat(145.2645969)),
                        weight:425000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8308412),
                        parseFloat(143.8471568)),
                        weight:424500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.478048),
                        parseFloat(144.0288116)),
                        weight:2312737
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5591501),
                        parseFloat(143.0103947)),
                        weight:575000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3265068),
                        parseFloat(146.2370535)),
                        weight:752000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6734248),
                        parseFloat(142.9566117)),
                        weight:120000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1875811),
                        parseFloat(147.7253954)),
                        weight:567500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0092538),
                        parseFloat(146.0380917)),
                        weight:572500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0122053),
                        parseFloat(146.0377888)),
                        weight:212500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4756093),
                        parseFloat(144.9497098)),
                        weight:218000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.366667),
                        parseFloat(143.95)),
                        weight:2385000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.366667),
                        parseFloat(143.933333)),
                        weight:381625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.147),
                        parseFloat(145.423)),
                        weight:1298750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.183333),
                        parseFloat(145.65)),
                        weight:1949393
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7039692),
                        parseFloat(143.1887679)),
                        weight:349500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.738899),
                        parseFloat(143.8508908)),
                        weight:539000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.1905541),
                        parseFloat(141.6192258)),
                        weight:228250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6445852),
                        parseFloat(143.9650343)),
                        weight:940000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7216239),
                        parseFloat(144.6346338)),
                        weight:245000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1922309),
                        parseFloat(145.7095511)),
                        weight:295000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3259093),
                        parseFloat(144.5382417)),
                        weight:900000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.6867808),
                        parseFloat(144.1128981)),
                        weight:350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3017794),
                        parseFloat(146.1086461)),
                        weight:630000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1),
                        parseFloat(147.6)),
                        weight:242093
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8316698),
                        parseFloat(143.1087247)),
                        weight:430000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.64300000000001),
                        parseFloat(145.239)),
                        weight:1216492
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4112326),
                        parseFloat(145.1822722)),
                        weight:385000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1990403),
                        parseFloat(145.0650959)),
                        weight:560000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7638978),
                        parseFloat(145.750833)),
                        weight:452500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7510906),
                        parseFloat(147.3266955)),
                        weight:825000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.767),
                        parseFloat(145.647)),
                        weight:745687
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4677867),
                        parseFloat(145.0955173)),
                        weight:1640000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8313336),
                        parseFloat(144.680948)),
                        weight:550570
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6051768),
                        parseFloat(143.2587937)),
                        weight:585000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9382725),
                        parseFloat(146.4507298)),
                        weight:134625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.899),
                        parseFloat(145.007)),
                        weight:549930
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5735787),
                        parseFloat(145.3520475)),
                        weight:379000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7135003),
                        parseFloat(144.7608291)),
                        weight:325000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.224),
                        parseFloat(145.309)),
                        weight:770007
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1026004),
                        parseFloat(147.073027)),
                        weight:382500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6982783),
                        parseFloat(144.7988921)),
                        weight:748000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1232002),
                        parseFloat(145.963705)),
                        weight:3300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.683523),
                        parseFloat(144.583444)),
                        weight:286593
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.05),
                        parseFloat(145.683333)),
                        weight:1102562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.772379),
                        parseFloat(145.6376697)),
                        weight:1580000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6117964),
                        parseFloat(144.8401227)),
                        weight:1750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5179166),
                        parseFloat(146.0843236)),
                        weight:450000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4912025),
                        parseFloat(147.9333322)),
                        weight:445628
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.716866),
                        parseFloat(144.696007)),
                        weight:599839
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.516667),
                        parseFloat(142.033333)),
                        weight:165000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0590785),
                        parseFloat(145.4053755)),
                        weight:605265
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0279745),
                        parseFloat(147.1149275)),
                        weight:755004
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.85333079999999),
                        parseFloat(145.0437181)),
                        weight:699400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5769405),
                        parseFloat(143.0405196)),
                        weight:6950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6990164),
                        parseFloat(144.7171246)),
                        weight:362150
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8547498),
                        parseFloat(144.1624607)),
                        weight:871119
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.774),
                        parseFloat(145.491)),
                        weight:649228
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3068084),
                        parseFloat(141.5727929)),
                        weight:408250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.828681),
                        parseFloat(144.991809)),
                        weight:547240
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.547222),
                        parseFloat(145.946944)),
                        weight:561054
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:323000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:361000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5337448),
                        parseFloat(144.8937988)),
                        weight:572951
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4591287),
                        parseFloat(144.6915719)),
                        weight:732212
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.68254659999999),
                        parseFloat(144.4885279)),
                        weight:720000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1338836),
                        parseFloat(145.0383133)),
                        weight:920000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2625),
                        parseFloat(144.1494444)),
                        weight:210000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8255403),
                        parseFloat(144.6734013)),
                        weight:341805
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9319835),
                        parseFloat(145.2199715)),
                        weight:355000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8296728),
                        parseFloat(145.0126479)),
                        weight:540750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1162338),
                        parseFloat(146.8906882)),
                        weight:233000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.866667),
                        parseFloat(145.533333)),
                        weight:1315000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:248000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6011914),
                        parseFloat(144.9910276)),
                        weight:331425
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6871859),
                        parseFloat(143.6620414)),
                        weight:307500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9961863),
                        parseFloat(143.698961)),
                        weight:166119
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7670418),
                        parseFloat(143.8274714)),
                        weight:199267
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.083333),
                        parseFloat(145.616667)),
                        weight:731750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.813056),
                        parseFloat(145.067778)),
                        weight:1070000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.308012),
                        parseFloat(143.8037198)),
                        weight:288000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3112721),
                        parseFloat(145.9233883)),
                        weight:440000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1602076),
                        parseFloat(144.2211029)),
                        weight:462500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0617338),
                        parseFloat(145.3856064)),
                        weight:608130
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2181003),
                        parseFloat(145.9247217)),
                        weight:2062500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.72684750000001),
                        parseFloat(143.8166126)),
                        weight:430000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.25),
                        parseFloat(144.516667)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6521892),
                        parseFloat(144.8924728)),
                        weight:99500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.103311),
                        parseFloat(145.284675)),
                        weight:552983
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3787122),
                        parseFloat(141.3832471)),
                        weight:250000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8170203),
                        parseFloat(146.8541343)),
                        weight:195000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6047596),
                        parseFloat(144.9965283)),
                        weight:487690
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8432214),
                        parseFloat(144.6381133)),
                        weight:342900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7929116),
                        parseFloat(145.1426403)),
                        weight:280000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8529357),
                        parseFloat(144.5932769)),
                        weight:315500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.333333),
                        parseFloat(144.266667)),
                        weight:1422460
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1234125),
                        parseFloat(145.3644559)),
                        weight:564600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.692889),
                        parseFloat(144.720901)),
                        weight:564758
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6805348),
                        parseFloat(147.7131428)),
                        weight:613340
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8403797),
                        parseFloat(147.5776336)),
                        weight:443075
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2033155),
                        parseFloat(143.7708834)),
                        weight:150000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6087593),
                        parseFloat(143.5563966)),
                        weight:240000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8193211),
                        parseFloat(142.8105079)),
                        weight:525000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4052266),
                        parseFloat(146.5416907)),
                        weight:600200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.917674),
                        parseFloat(147.7140915)),
                        weight:458500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.15785229999999),
                        parseFloat(146.3111078)),
                        weight:443810
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5459508),
                        parseFloat(143.1120852)),
                        weight:645000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6942678),
                        parseFloat(144.7203139)),
                        weight:466155
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8432214),
                        parseFloat(144.6381133)),
                        weight:566152
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6629142),
                        parseFloat(144.3597259)),
                        weight:392739
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5441741),
                        parseFloat(144.9846496)),
                        weight:537591
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.544166),
                        parseFloat(144.1890489)),
                        weight:299717
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1656455),
                        parseFloat(145.2026672)),
                        weight:613708
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.70675190000001),
                        parseFloat(144.6177925)),
                        weight:469206
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4568155),
                        parseFloat(145.9415718)),
                        weight:250000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.688961),
                        parseFloat(144.708847)),
                        weight:578449
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.386111),
                        parseFloat(142.593056)),
                        weight:455214
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:283000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4671826),
                        parseFloat(146.5802188)),
                        weight:565000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3508478),
                        parseFloat(144.5855088)),
                        weight:350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.05),
                        parseFloat(141.016667)),
                        weight:546380
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3141342),
                        parseFloat(144.6504467)),
                        weight:215000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2127532),
                        parseFloat(146.5483703)),
                        weight:534035
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0783424),
                        parseFloat(144.2893459)),
                        weight:870000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8305164),
                        parseFloat(144.9734319)),
                        weight:553529
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7221792),
                        parseFloat(144.5727431)),
                        weight:360962
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1799535),
                        parseFloat(146.3041504)),
                        weight:535446
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6980733),
                        parseFloat(145.2756505)),
                        weight:691081
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0680587),
                        parseFloat(145.3441447)),
                        weight:797000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.599167),
                        parseFloat(145.608876)),
                        weight:528640
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9718653),
                        parseFloat(141.3642133)),
                        weight:211000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1228205),
                        parseFloat(145.3363428)),
                        weight:642400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5926589),
                        parseFloat(143.796713)),
                        weight:180000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.15),
                        parseFloat(142.85)),
                        weight:212140
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9180065),
                        parseFloat(147.7736105)),
                        weight:369062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.683333),
                        parseFloat(143.833333)),
                        weight:691125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5870913),
                        parseFloat(146.8430584)),
                        weight:510000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1836514),
                        parseFloat(146.5825806)),
                        weight:685000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7151507),
                        parseFloat(145.6590084)),
                        weight:98000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.05),
                        parseFloat(143.775)),
                        weight:477500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.416944),
                        parseFloat(143.983056)),
                        weight:426275
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6716417),
                        parseFloat(147.5657205)),
                        weight:325000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0793342),
                        parseFloat(145.3527069)),
                        weight:600250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8658814),
                        parseFloat(147.2869802)),
                        weight:471497
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1302757),
                        parseFloat(145.3155822)),
                        weight:480632
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.132),
                        parseFloat(145.293)),
                        weight:539521
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.327028),
                        parseFloat(145.9769353)),
                        weight:595000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.671),
                        parseFloat(145.155)),
                        weight:512605
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6773716),
                        parseFloat(144.8779386)),
                        weight:599000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8703008),
                        parseFloat(144.6702157)),
                        weight:466393
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.62944299999999),
                        parseFloat(144.882661)),
                        weight:713588
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.35),
                        parseFloat(145.433333)),
                        weight:582109
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1676245),
                        parseFloat(143.749465)),
                        weight:87500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8255256),
                        parseFloat(144.5849219)),
                        weight:380000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8361962),
                        parseFloat(144.721418)),
                        weight:280000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.811),
                        parseFloat(145.453)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2117228),
                        parseFloat(144.6069692)),
                        weight:650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3667365),
                        parseFloat(143.9448801)),
                        weight:875000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3485607),
                        parseFloat(146.1086461)),
                        weight:749000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8324013),
                        parseFloat(144.7220065)),
                        weight:350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6617944),
                        parseFloat(144.3480893)),
                        weight:139000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6723618),
                        parseFloat(143.8186485)),
                        weight:102500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.361456),
                        parseFloat(144.2179132)),
                        weight:255000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.848613),
                        parseFloat(144.6517126)),
                        weight:127000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4562523),
                        parseFloat(144.3193914)),
                        weight:122000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4242265),
                        parseFloat(145.463777)),
                        weight:650113
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9227684),
                        parseFloat(143.353865)),
                        weight:4736672
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3736745),
                        parseFloat(145.1261924)),
                        weight:589035
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8479661),
                        parseFloat(147.9297636)),
                        weight:310625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5970662),
                        parseFloat(146.4544127)),
                        weight:561000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1349479),
                        parseFloat(146.013851)),
                        weight:3351600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4397672),
                        parseFloat(145.819453)),
                        weight:205801
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.588333),
                        parseFloat(143.699444)),
                        weight:250000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5837958),
                        parseFloat(143.8021455)),
                        weight:493557
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:395043
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5453777),
                        parseFloat(145.4659789)),
                        weight:245000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0175299),
                        parseFloat(144.3534486)),
                        weight:644207
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0175299),
                        parseFloat(144.3534486)),
                        weight:609311
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1288008),
                        parseFloat(145.2870179)),
                        weight:643583
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1233012),
                        parseFloat(145.3702829)),
                        weight:525875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2263406),
                        parseFloat(146.1870498)),
                        weight:850000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3590952),
                        parseFloat(143.3332684)),
                        weight:285995
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8464377),
                        parseFloat(144.6391364)),
                        weight:559690
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7307598),
                        parseFloat(144.6125715)),
                        weight:330000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2352558),
                        parseFloat(145.2270858)),
                        weight:658750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.666667),
                        parseFloat(146.433333)),
                        weight:408734
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.782511),
                        parseFloat(144.892763)),
                        weight:611700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0590785),
                        parseFloat(145.4053755)),
                        weight:539508
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6183432),
                        parseFloat(146.3488562)),
                        weight:649500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1576304),
                        parseFloat(145.4243197)),
                        weight:369062
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8468121),
                        parseFloat(147.6799159)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9287423),
                        parseFloat(145.2846835)),
                        weight:93250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.945443),
                        parseFloat(145.15386)),
                        weight:474900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2441171),
                        parseFloat(144.4499914)),
                        weight:618066
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1479054),
                        parseFloat(146.9269017)),
                        weight:454406
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.27500149999999),
                        parseFloat(144.1222545)),
                        weight:1175000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8724612),
                        parseFloat(144.6233935)),
                        weight:551730
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0221951),
                        parseFloat(144.7082568)),
                        weight:327500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9163753),
                        parseFloat(146.7461215)),
                        weight:2476748
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2409082),
                        parseFloat(145.3537565)),
                        weight:577500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6762507),
                        parseFloat(142.7075582)),
                        weight:165000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5562359),
                        parseFloat(143.5647819)),
                        weight:347500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3133743),
                        parseFloat(146.3621416)),
                        weight:880000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.183333),
                        parseFloat(145.716667)),
                        weight:575000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.432163),
                        parseFloat(145.823567)),
                        weight:551077
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3876863),
                        parseFloat(142.4841795)),
                        weight:544600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5233314),
                        parseFloat(145.6710457)),
                        weight:1265812
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7142444),
                        parseFloat(146.3392412)),
                        weight:688686
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8271186),
                        parseFloat(144.9574402)),
                        weight:725000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4626786),
                        parseFloat(142.5832479)),
                        weight:24000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6540795),
                        parseFloat(142.3982216)),
                        weight:240000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.232544),
                        parseFloat(146.1337552)),
                        weight:360000
                        },

{location: new google.maps.LatLng(
                        parseFloat(48.4598808),
                        parseFloat(-123.3319093)),
                        weight:379000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.636944),
                        parseFloat(144.803056)),
                        weight:1322500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6897235),
                        parseFloat(144.7167148)),
                        weight:569987
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.849937),
                        parseFloat(143.5233295)),
                        weight:89000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.151738),
                        parseFloat(145.2795565)),
                        weight:647100
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3256034),
                        parseFloat(146.296585)),
                        weight:235156
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:345000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4219075),
                        parseFloat(146.8226797)),
                        weight:11000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4036751),
                        parseFloat(146.839377)),
                        weight:580000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6084626),
                        parseFloat(143.9572156)),
                        weight:331250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:357500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.30639),
                        parseFloat(146.3628409)),
                        weight:1335000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.417985),
                        parseFloat(145.0027939)),
                        weight:550000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.1909919),
                        parseFloat(142.9480585)),
                        weight:14925
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.449327),
                        parseFloat(145.5326969)),
                        weight:1300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1692678),
                        parseFloat(145.8829724)),
                        weight:632000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.93806319999999),
                        parseFloat(146.684357)),
                        weight:491000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5769958),
                        parseFloat(143.5639019)),
                        weight:499250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0617338),
                        parseFloat(145.3856064)),
                        weight:587740
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.81748779999999),
                        parseFloat(144.6762998)),
                        weight:418500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7370439),
                        parseFloat(145.7421233)),
                        weight:608404
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9051176),
                        parseFloat(144.557682)),
                        weight:725000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.81),
                        parseFloat(145.51)),
                        weight:935050
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.285937),
                        parseFloat(144.2866151)),
                        weight:869375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.7711842),
                        parseFloat(142.38679)),
                        weight:440000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.61730120000001),
                        parseFloat(144.335443)),
                        weight:1187434
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.4115116),
                        parseFloat(141.4462452)),
                        weight:12500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7233487),
                        parseFloat(146.0452061)),
                        weight:990000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.29500549999999),
                        parseFloat(144.1931402)),
                        weight:1395000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.16349020000001),
                        parseFloat(141.6208782)),
                        weight:258000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3969446),
                        parseFloat(144.9744911)),
                        weight:270000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1712677),
                        parseFloat(145.6720867)),
                        weight:640000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.599167),
                        parseFloat(145.608876)),
                        weight:563060
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0126207),
                        parseFloat(146.6591011)),
                        weight:439750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6018557),
                        parseFloat(145.0298968)),
                        weight:344500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.245262),
                        parseFloat(144.5491997)),
                        weight:1800000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8247186),
                        parseFloat(144.6771483)),
                        weight:320000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.125545),
                        parseFloat(146.902535)),
                        weight:145178
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.125545),
                        parseFloat(146.902535)),
                        weight:130000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0345542),
                        parseFloat(145.6294143)),
                        weight:1302343
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7451219),
                        parseFloat(147.8197188)),
                        weight:645000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.60253),
                        parseFloat(144.98611)),
                        weight:581063
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6045996),
                        parseFloat(144.9910006)),
                        weight:581692
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.692889),
                        parseFloat(144.720901)),
                        weight:553919
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2652467),
                        parseFloat(145.1486206)),
                        weight:590000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3148097),
                        parseFloat(146.4663922)),
                        weight:389000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1016951),
                        parseFloat(145.3927933)),
                        weight:549250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3194005),
                        parseFloat(144.4052024)),
                        weight:615937
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0580067),
                        parseFloat(144.9618719)),
                        weight:1332550
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8432214),
                        parseFloat(144.6381133)),
                        weight:550006
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1656455),
                        parseFloat(145.2026672)),
                        weight:548450
                        },

{location: new google.maps.LatLng(
                        parseFloat(-17.0095144),
                        parseFloat(145.740568)),
                        weight:1145000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1234125),
                        parseFloat(145.3644559)),
                        weight:541700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7311632),
                        parseFloat(144.3053576)),
                        weight:544000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1143542),
                        parseFloat(145.3287205)),
                        weight:502275
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.524722),
                        parseFloat(145.433333)),
                        weight:913747
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.03835249999999),
                        parseFloat(143.401068)),
                        weight:347620
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5191978),
                        parseFloat(141.5488547)),
                        weight:350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0053348),
                        parseFloat(146.4104044)),
                        weight:775000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.28333300000001),
                        parseFloat(141.65)),
                        weight:307687
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9615653),
                        parseFloat(144.4997455)),
                        weight:2316875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4568155),
                        parseFloat(145.9415718)),
                        weight:215000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.04996939999999),
                        parseFloat(145.3267499)),
                        weight:365000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1492855),
                        parseFloat(144.8181305)),
                        weight:659000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2794244),
                        parseFloat(142.3071773)),
                        weight:632732
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7092607),
                        parseFloat(148.3937975)),
                        weight:599000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7553132),
                        parseFloat(147.4796981)),
                        weight:850000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.649903),
                        parseFloat(146.6710267)),
                        weight:350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.14451469999999),
                        parseFloat(145.2864532)),
                        weight:472695
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.383333),
                        parseFloat(143.683333)),
                        weight:739000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.543194),
                        parseFloat(144.976419)),
                        weight:579442
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.15),
                        parseFloat(145.683333)),
                        weight:8001637
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7124809),
                        parseFloat(144.6724358)),
                        weight:598751
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3371005),
                        parseFloat(145.0305448)),
                        weight:1800000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9482551),
                        parseFloat(145.1044805)),
                        weight:625000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8835892),
                        parseFloat(144.5969391)),
                        weight:331109
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:253000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1650163),
                        parseFloat(144.3985947)),
                        weight:286000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5718),
                        parseFloat(144.7935)),
                        weight:1000000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.421),
                        parseFloat(145.075)),
                        weight:3500000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4735452),
                        parseFloat(144.9731641)),
                        weight:440760
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1284806),
                        parseFloat(144.1617791)),
                        weight:472500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0511015),
                        parseFloat(145.4013974)),
                        weight:699000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0576659),
                        parseFloat(145.4397468)),
                        weight:846400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1707159),
                        parseFloat(146.7117693)),
                        weight:557000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.214256),
                        parseFloat(146.2426404)),
                        weight:739375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6040803),
                        parseFloat(146.3768277)),
                        weight:546562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8519178),
                        parseFloat(144.6673308)),
                        weight:402316
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4402645),
                        parseFloat(141.3289955)),
                        weight:295000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:475000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8488197),
                        parseFloat(145.4080574)),
                        weight:341250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4803585),
                        parseFloat(144.78584)),
                        weight:2622750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.7551203),
                        parseFloat(143.2514948)),
                        weight:6950000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2363402),
                        parseFloat(146.0814874)),
                        weight:850000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7847993),
                        parseFloat(144.7786708)),
                        weight:580905
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3823929),
                        parseFloat(144.1338372)),
                        weight:1922500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9171202),
                        parseFloat(146.8298938)),
                        weight:360000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.620833),
                        parseFloat(142.729167)),
                        weight:95000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7631342),
                        parseFloat(144.3125313)),
                        weight:425000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2156138),
                        parseFloat(144.0575587)),
                        weight:945000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8857797),
                        parseFloat(143.7891332)),
                        weight:670000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2555216),
                        parseFloat(145.9247217)),
                        weight:1025000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.2479402),
                        parseFloat(142.0423986)),
                        weight:544375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6148971),
                        parseFloat(143.2571657)),
                        weight:75000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.45697),
                        parseFloat(144.9236773)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0564124),
                        parseFloat(142.5456629)),
                        weight:250000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1143542),
                        parseFloat(145.3287205)),
                        weight:541945
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1148202),
                        parseFloat(145.251787)),
                        weight:658544
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2591504),
                        parseFloat(144.7961441)),
                        weight:1630628
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:164000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6585786),
                        parseFloat(144.4725244)),
                        weight:1300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4),
                        parseFloat(144.9)),
                        weight:770000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1590503),
                        parseFloat(144.2640892)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3689875),
                        parseFloat(141.87965)),
                        weight:131000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.134338),
                        parseFloat(145.5025595)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2870441),
                        parseFloat(146.9263742)),
                        weight:697450
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7680894),
                        parseFloat(143.8597174)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0541239),
                        parseFloat(142.3048108)),
                        weight:329875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6229655),
                        parseFloat(145.0898356)),
                        weight:265000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6434828),
                        parseFloat(144.2927596)),
                        weight:1500000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7847993),
                        parseFloat(144.7786708)),
                        weight:506785
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4238058),
                        parseFloat(145.0603633)),
                        weight:971875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.7545959),
                        parseFloat(143.4441754)),
                        weight:130000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7981846),
                        parseFloat(146.427897)),
                        weight:445000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.504782),
                        parseFloat(146.159569)),
                        weight:382000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3282508),
                        parseFloat(142.5158563)),
                        weight:431500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.088238),
                        parseFloat(146.5749622)),
                        weight:788000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5012181),
                        parseFloat(143.2287385)),
                        weight:290000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4388581),
                        parseFloat(143.5527423)),
                        weight:1003437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4059155),
                        parseFloat(146.7526731)),
                        weight:500600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8973062),
                        parseFloat(144.6262759)),
                        weight:199990
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5337448),
                        parseFloat(144.8937988)),
                        weight:504724
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7540053),
                        parseFloat(144.9111976)),
                        weight:359000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4491886),
                        parseFloat(144.1382841)),
                        weight:835000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.397199),
                        parseFloat(146.5413273)),
                        weight:1120500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7580965),
                        parseFloat(142.0555986)),
                        weight:295000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.38271719999999),
                        parseFloat(141.5090945)),
                        weight:458000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6047596),
                        parseFloat(144.9965283)),
                        weight:641885
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7650657),
                        parseFloat(145.0541611)),
                        weight:360000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9217288),
                        parseFloat(143.7531872)),
                        weight:465000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.413),
                        parseFloat(144.888)),
                        weight:1500000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9935883),
                        parseFloat(146.3457099)),
                        weight:495000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0576659),
                        parseFloat(145.4397468)),
                        weight:545229
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0527793),
                        parseFloat(145.6835389)),
                        weight:237687
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4386959),
                        parseFloat(142.8027065)),
                        weight:229000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8501487),
                        parseFloat(144.9797494)),
                        weight:312500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8626988),
                        parseFloat(145.007903)),
                        weight:330000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6773468),
                        parseFloat(145.9226338)),
                        weight:723562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9870569),
                        parseFloat(142.9194493)),
                        weight:39000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5207531),
                        parseFloat(144.0830163)),
                        weight:214750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5993616),
                        parseFloat(143.2170396)),
                        weight:430000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.286259),
                        parseFloat(145.7911919)),
                        weight:2270000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.649784),
                        parseFloat(142.8473788)),
                        weight:6500000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6466958),
                        parseFloat(144.9669559)),
                        weight:255000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8886504),
                        parseFloat(144.5970968)),
                        weight:268500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5879921),
                        parseFloat(146.2985284)),
                        weight:799000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8529357),
                        parseFloat(144.5932769)),
                        weight:460957
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6759776),
                        parseFloat(144.5915889)),
                        weight:489425
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7196729),
                        parseFloat(144.7163968)),
                        weight:540806
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1888471),
                        parseFloat(146.8254903)),
                        weight:1275000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4358301),
                        parseFloat(145.919154)),
                        weight:1350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1959366),
                        parseFloat(144.2405462)),
                        weight:323750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.783333),
                        parseFloat(144.25)),
                        weight:427000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8887509),
                        parseFloat(144.5942876)),
                        weight:329000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2441508),
                        parseFloat(145.0438252)),
                        weight:716183
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3032416),
                        parseFloat(144.6446873)),
                        weight:450000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.269722),
                        parseFloat(145.966944)),
                        weight:302500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0284764),
                        parseFloat(144.1011245)),
                        weight:535000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3391603),
                        parseFloat(143.5965629)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.366944),
                        parseFloat(144.284722)),
                        weight:2125000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7705999),
                        parseFloat(143.987135)),
                        weight:600000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6679515),
                        parseFloat(144.4161316)),
                        weight:257833
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7119373),
                        parseFloat(144.8753781)),
                        weight:473200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.21595569999999),
                        parseFloat(146.1265609)),
                        weight:483000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1772101),
                        parseFloat(143.6420207)),
                        weight:375437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.73314999999999),
                        parseFloat(144.6521281)),
                        weight:223000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.73314999999999),
                        parseFloat(144.6521281)),
                        weight:355000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.384),
                        parseFloat(145.024)),
                        weight:2750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7718005),
                        parseFloat(147.8116993)),
                        weight:1650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0658326),
                        parseFloat(147.2208225)),
                        weight:399000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.26429520000001),
                        parseFloat(146.2475293)),
                        weight:1087312
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.49223509999999),
                        parseFloat(143.5837732)),
                        weight:1600000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9877659),
                        parseFloat(141.7275765)),
                        weight:277750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8501487),
                        parseFloat(144.9797494)),
                        weight:286000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.45844779999999),
                        parseFloat(145.8746249)),
                        weight:600000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3883321),
                        parseFloat(145.480396)),
                        weight:889250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:452640
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.55),
                        parseFloat(142.383333)),
                        weight:676500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.4741667),
                        parseFloat(142.3513591)),
                        weight:89000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.1372058),
                        parseFloat(142.0228245)),
                        weight:299562
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.298641),
                        parseFloat(144.33676)),
                        weight:355000
                        },

{location: new google.maps.LatLng(
                        parseFloat(30.417446),
                        parseFloat(-90.162386)),
                        weight:384274
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0263156),
                        parseFloat(145.7426579)),
                        weight:606830
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0900709),
                        parseFloat(144.6581754)),
                        weight:647500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.79014410000001),
                        parseFloat(144.2647717)),
                        weight:732500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:183000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0802802),
                        parseFloat(145.336909)),
                        weight:709750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5589898),
                        parseFloat(143.7919394)),
                        weight:319900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.883333),
                        parseFloat(146.1)),
                        weight:429000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:189000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8452927),
                        parseFloat(144.6498558)),
                        weight:489860
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4167994),
                        parseFloat(144.5393923)),
                        weight:345000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7330791),
                        parseFloat(144.6237072)),
                        weight:595900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0202832),
                        parseFloat(141.0108954)),
                        weight:120000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3326869),
                        parseFloat(141.0677289)),
                        weight:4200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.35412),
                        parseFloat(146.3044445)),
                        weight:502500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.017),
                        parseFloat(145.386)),
                        weight:580000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4873812),
                        parseFloat(144.3848445)),
                        weight:725000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.544),
                        parseFloat(145.056)),
                        weight:596481
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1414772),
                        parseFloat(141.6629929)),
                        weight:49000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5008056),
                        parseFloat(144.2105217)),
                        weight:680000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8414459),
                        parseFloat(145.0698436)),
                        weight:348650
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3799373),
                        parseFloat(142.9939238)),
                        weight:110000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.796117),
                        parseFloat(144.9158115)),
                        weight:210000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9732434),
                        parseFloat(142.4698649)),
                        weight:49000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9028257),
                        parseFloat(144.7323888)),
                        weight:325000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1764711),
                        parseFloat(148.6825219)),
                        weight:29000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.582508),
                        parseFloat(144.7604827)),
                        weight:527745
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5989332),
                        parseFloat(144.7126405)),
                        weight:702402
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1520643),
                        parseFloat(145.8534534)),
                        weight:542587
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1403799),
                        parseFloat(145.9511191)),
                        weight:573590
                        },

{location: new google.maps.LatLng(
                        parseFloat(-33.708356),
                        parseFloat(151.0114857)),
                        weight:446145
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9318234),
                        parseFloat(147.2007191)),
                        weight:461410
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3806958),
                        parseFloat(144.1949684)),
                        weight:420430
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2155589),
                        parseFloat(145.5378941)),
                        weight:642194
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.9282331),
                        parseFloat(138.6039198)),
                        weight:490421
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6805348),
                        parseFloat(147.7131428)),
                        weight:505833
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1841399),
                        parseFloat(146.5069244)),
                        weight:439440
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8403797),
                        parseFloat(147.5776336)),
                        weight:408536
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.570013),
                        parseFloat(143.7989997)),
                        weight:503402
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0640624),
                        parseFloat(141.5426993)),
                        weight:360000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.787111),
                        parseFloat(145.1271901)),
                        weight:507230
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6047192),
                        parseFloat(143.9405609)),
                        weight:286371
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0881747),
                        parseFloat(147.403641)),
                        weight:455000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6122755),
                        parseFloat(144.8900889)),
                        weight:550000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.316667),
                        parseFloat(144.6)),
                        weight:1418506
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.766667),
                        parseFloat(142.1)),
                        weight:772250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4391452),
                        parseFloat(145.9393385)),
                        weight:695000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:205000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0241763),
                        parseFloat(145.5293823)),
                        weight:850000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.355),
                        parseFloat(145.016)),
                        weight:1477543
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.4593153),
                        parseFloat(142.2033193)),
                        weight:329900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5989332),
                        parseFloat(144.7126405)),
                        weight:715604
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8282806),
                        parseFloat(144.7082568)),
                        weight:481632
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.7163155),
                        parseFloat(143.143354)),
                        weight:139000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9173622),
                        parseFloat(145.238977)),
                        weight:240750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.429237),
                        parseFloat(143.3380614)),
                        weight:190000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3301679),
                        parseFloat(145.302945)),
                        weight:560000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.048543),
                        parseFloat(145.322772)),
                        weight:577083
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8133636),
                        parseFloat(143.9592552)),
                        weight:850000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5324694),
                        parseFloat(147.4961766)),
                        weight:249000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2709113),
                        parseFloat(143.3784013)),
                        weight:460000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3211082),
                        parseFloat(145.0455925)),
                        weight:165000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7175268),
                        parseFloat(148.1639603)),
                        weight:920000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.7761059),
                        parseFloat(143.4336928)),
                        weight:1515000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2845425),
                        parseFloat(143.4932523)),
                        weight:1250000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.29435240000001),
                        parseFloat(143.4771357)),
                        weight:202500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8574732),
                        parseFloat(145.0141502)),
                        weight:440000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5439161),
                        parseFloat(145.0230385)),
                        weight:490130
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6227645),
                        parseFloat(144.7033843)),
                        weight:549581
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7175064),
                        parseFloat(144.7157592)),
                        weight:636500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9523424),
                        parseFloat(144.2364525)),
                        weight:195000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2729634),
                        parseFloat(145.7040584)),
                        weight:699000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8255403),
                        parseFloat(144.6734013)),
                        weight:250900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.949),
                        parseFloat(145.26)),
                        weight:807500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6993137),
                        parseFloat(141.8991762)),
                        weight:749000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0791967),
                        parseFloat(147.1231644)),
                        weight:738685
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:517500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4697126),
                        parseFloat(144.0507661)),
                        weight:150000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2237827),
                        parseFloat(142.1140597)),
                        weight:825000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9505525),
                        parseFloat(145.1436594)),
                        weight:370000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2213851),
                        parseFloat(143.7332293)),
                        weight:412775
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.600724),
                        parseFloat(144.713328)),
                        weight:539201
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5871532),
                        parseFloat(144.7481666)),
                        weight:540623
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.61900000000001),
                        parseFloat(145.256)),
                        weight:1693125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4821643),
                        parseFloat(143.5022376)),
                        weight:300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5440788),
                        parseFloat(145.8737829)),
                        weight:586250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8107376),
                        parseFloat(144.9697723)),
                        weight:496820
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4779623),
                        parseFloat(146.0953967)),
                        weight:173572
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3103547),
                        parseFloat(142.2303981)),
                        weight:320000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1498396),
                        parseFloat(143.1093525)),
                        weight:232500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4947183),
                        parseFloat(143.8072806)),
                        weight:229208
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3195848),
                        parseFloat(144.7775976)),
                        weight:480350
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.399794),
                        parseFloat(145.321315)),
                        weight:29000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.07024699999999),
                        parseFloat(145.2532601)),
                        weight:486500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0778252),
                        parseFloat(144.6080076)),
                        weight:1315000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.32300840000001),
                        parseFloat(144.8181305)),
                        weight:1440000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1520643),
                        parseFloat(145.8534534)),
                        weight:303013
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0759968),
                        parseFloat(145.763398)),
                        weight:551125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5404101),
                        parseFloat(144.8939396)),
                        weight:447368
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2836761),
                        parseFloat(145.0108596)),
                        weight:490000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8346154),
                        parseFloat(144.6526479)),
                        weight:495960
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4304903),
                        parseFloat(144.4113046)),
                        weight:355000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4987977),
                        parseFloat(143.2429647)),
                        weight:250000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.19),
                        parseFloat(145.425)),
                        weight:1345000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7083084),
                        parseFloat(144.6212319)),
                        weight:574368
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:275000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0956433),
                        parseFloat(145.3553854)),
                        weight:265000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:420000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0527004),
                        parseFloat(145.323514)),
                        weight:409000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0611204),
                        parseFloat(145.415089)),
                        weight:362500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2403565),
                        parseFloat(144.3572448)),
                        weight:295000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.087191),
                        parseFloat(146.3069145)),
                        weight:775000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1433736),
                        parseFloat(145.9591225)),
                        weight:503243
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.599167),
                        parseFloat(145.608876)),
                        weight:491882
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8771944),
                        parseFloat(145.2209437)),
                        weight:532800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6957938),
                        parseFloat(143.7206469)),
                        weight:190000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8245518),
                        parseFloat(141.3414454)),
                        weight:625000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6855344),
                        parseFloat(144.5811192)),
                        weight:437800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.63375389999999),
                        parseFloat(144.9243652)),
                        weight:242450
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5014139),
                        parseFloat(145.2318777)),
                        weight:382250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.497),
                        parseFloat(145.175)),
                        weight:545000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2209691),
                        parseFloat(145.1431018)),
                        weight:635000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7408124),
                        parseFloat(144.6960512)),
                        weight:1710000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1807391),
                        parseFloat(144.7030125)),
                        weight:239950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6014753),
                        parseFloat(143.8232579)),
                        weight:45000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.596576),
                        parseFloat(143.824255)),
                        weight:45000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7972508),
                        parseFloat(145.7929572)),
                        weight:950000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8353563),
                        parseFloat(144.6577293)),
                        weight:287000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.48002719999999),
                        parseFloat(145.7217235)),
                        weight:865000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6492935),
                        parseFloat(144.704384)),
                        weight:287500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9844362),
                        parseFloat(145.4665466)),
                        weight:1575100
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6657459),
                        parseFloat(143.8574394)),
                        weight:1312500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1771976),
                        parseFloat(146.9521466)),
                        weight:140000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:353899
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.17112300000001),
                        parseFloat(144.71719)),
                        weight:486610
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2426543),
                        parseFloat(144.3811681)),
                        weight:524168
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2465889),
                        parseFloat(141.8101803)),
                        weight:462436
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1562641),
                        parseFloat(145.1471679)),
                        weight:329650
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1195925),
                        parseFloat(145.8885379)),
                        weight:649000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1656455),
                        parseFloat(145.2026672)),
                        weight:483627
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6432404),
                        parseFloat(143.5352376)),
                        weight:170000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.3883964),
                        parseFloat(141.3354325)),
                        weight:10000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3342774),
                        parseFloat(145.1685789)),
                        weight:656686
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0661066),
                        parseFloat(145.3011515)),
                        weight:370000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8984001),
                        parseFloat(143.831487)),
                        weight:162500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2252883),
                        parseFloat(144.3340454)),
                        weight:534574
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.616618),
                        parseFloat(143.2603641)),
                        weight:85000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7590189),
                        parseFloat(148.9606122)),
                        weight:403750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8090593),
                        parseFloat(146.070298)),
                        weight:245000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2094219),
                        parseFloat(145.8781029)),
                        weight:579375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9767763),
                        parseFloat(147.5871797)),
                        weight:350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0854163),
                        parseFloat(145.9977237)),
                        weight:188583
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2109679),
                        parseFloat(147.5988028)),
                        weight:12190
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:324000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8149223),
                        parseFloat(144.9632639)),
                        weight:235000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.57027799999999),
                        parseFloat(146.553889)),
                        weight:1077500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7499014),
                        parseFloat(145.6918285)),
                        weight:200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8993247),
                        parseFloat(147.7902372)),
                        weight:482500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2380228),
                        parseFloat(145.576448)),
                        weight:1570000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3042515),
                        parseFloat(142.321598)),
                        weight:625000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.07729459999999),
                        parseFloat(145.8113478)),
                        weight:836868
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:277300
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9890135),
                        parseFloat(144.4266907)),
                        weight:560000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1869104),
                        parseFloat(145.4124348)),
                        weight:910625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6284182),
                        parseFloat(143.8981594)),
                        weight:2350156
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.32),
                        parseFloat(144.713)),
                        weight:861250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.299535),
                        parseFloat(146.7056325)),
                        weight:361437
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4563017),
                        parseFloat(145.2369621)),
                        weight:598699
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3437695),
                        parseFloat(142.2664028)),
                        weight:350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2301849),
                        parseFloat(142.4618694)),
                        weight:332725
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6288597),
                        parseFloat(142.3363938)),
                        weight:191531
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.569722),
                        parseFloat(146.254167)),
                        weight:320000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3863916),
                        parseFloat(145.5659261)),
                        weight:1712650
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8986154),
                        parseFloat(145.6090481)),
                        weight:209000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1877938),
                        parseFloat(146.5542894)),
                        weight:169000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1201405),
                        parseFloat(142.7171702)),
                        weight:149000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8147407),
                        parseFloat(145.7390855)),
                        weight:400000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7213499),
                        parseFloat(144.5934793)),
                        weight:421662
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7213499),
                        parseFloat(144.5934793)),
                        weight:417977
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3278408),
                        parseFloat(144.716849)),
                        weight:360000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:487070
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.856513),
                        parseFloat(144.2748086)),
                        weight:729500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7010094),
                        parseFloat(144.5466009)),
                        weight:575000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.571),
                        parseFloat(145.108)),
                        weight:1540000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.383333),
                        parseFloat(144.633333)),
                        weight:2200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.662927),
                        parseFloat(144.5954563)),
                        weight:225500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4239071),
                        parseFloat(144.9946544)),
                        weight:515036
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3997322),
                        parseFloat(147.9130599)),
                        weight:325000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.603),
                        parseFloat(145.181)),
                        weight:1000350
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5156677),
                        parseFloat(145.1091295)),
                        weight:320666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.016667),
                        parseFloat(143.966667)),
                        weight:515000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.821607),
                        parseFloat(144.0034717)),
                        weight:220000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7182197),
                        parseFloat(144.635025)),
                        weight:463090
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6499947),
                        parseFloat(145.0996977)),
                        weight:505000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.416667),
                        parseFloat(142.316667)),
                        weight:407000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1709364),
                        parseFloat(144.7047004)),
                        weight:546433
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1709364),
                        parseFloat(144.7047004)),
                        weight:473457
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.07442899999999),
                        parseFloat(144.3375)),
                        weight:543387
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7186737),
                        parseFloat(144.6360015)),
                        weight:441384
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5516613),
                        parseFloat(145.984487)),
                        weight:167500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.262222),
                        parseFloat(141.183333)),
                        weight:227000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.7350439),
                        parseFloat(143.4101801)),
                        weight:760625
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6234938),
                        parseFloat(143.8405471)),
                        weight:120000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.366667),
                        parseFloat(146.683333)),
                        weight:440000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.879573),
                        parseFloat(144.2245137)),
                        weight:150000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7786102),
                        parseFloat(145.5877877)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9204101),
                        parseFloat(145.1471947)),
                        weight:388500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2842302),
                        parseFloat(143.5689749)),
                        weight:450000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1545324),
                        parseFloat(142.8617484)),
                        weight:95500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9032343),
                        parseFloat(144.5956636)),
                        weight:348000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9359831),
                        parseFloat(143.3235128)),
                        weight:192500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3344408),
                        parseFloat(145.4062917)),
                        weight:549400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3941419),
                        parseFloat(145.3605635)),
                        weight:441900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3117549),
                        parseFloat(145.7104485)),
                        weight:260000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9873784),
                        parseFloat(145.2161094)),
                        weight:198000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8592194),
                        parseFloat(142.9345285)),
                        weight:189000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2973895),
                        parseFloat(143.3434443)),
                        weight:55000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3881673),
                        parseFloat(141.370286)),
                        weight:155000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4756101),
                        parseFloat(142.8131861)),
                        weight:525000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.936803),
                        parseFloat(144.7847217)),
                        weight:367500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0690534),
                        parseFloat(146.1623601)),
                        weight:591017
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9914497),
                        parseFloat(142.8844298)),
                        weight:405000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8421961),
                        parseFloat(144.2709331)),
                        weight:120000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.0337275),
                        parseFloat(142.413818)),
                        weight:99950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5011312),
                        parseFloat(146.2066412)),
                        weight:250000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8018587),
                        parseFloat(143.743302)),
                        weight:120000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7392972),
                        parseFloat(144.6656059)),
                        weight:342666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7426963),
                        parseFloat(147.1696848)),
                        weight:298000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9),
                        parseFloat(143.716667)),
                        weight:398500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.53388899999999),
                        parseFloat(146.094444)),
                        weight:455750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7098453),
                        parseFloat(144.7208305)),
                        weight:343875
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.254167),
                        parseFloat(143.365278)),
                        weight:449000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.61736570000001),
                        parseFloat(143.4736579)),
                        weight:500000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.81261560000001),
                        parseFloat(144.9703597)),
                        weight:621650
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4366557),
                        parseFloat(145.2328259)),
                        weight:482980
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9462827),
                        parseFloat(145.0802475)),
                        weight:365785
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4405455),
                        parseFloat(145.8183342)),
                        weight:71295
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1211212),
                        parseFloat(145.3322811)),
                        weight:592800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7135075),
                        parseFloat(144.9080174)),
                        weight:600650
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.961),
                        parseFloat(145.367)),
                        weight:708250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.048543),
                        parseFloat(145.322772)),
                        weight:825850
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3303222),
                        parseFloat(141.6064758)),
                        weight:583500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.205975),
                        parseFloat(143.7640371)),
                        weight:500500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.399794),
                        parseFloat(145.321315)),
                        weight:85495
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8134942),
                        parseFloat(144.9622926)),
                        weight:375000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5934485),
                        parseFloat(144.8976358)),
                        weight:260000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3778904),
                        parseFloat(144.5386182)),
                        weight:359000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8735197),
                        parseFloat(144.6899111)),
                        weight:336500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5928571),
                        parseFloat(146.2573078)),
                        weight:585500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9872127),
                        parseFloat(147.8342647)),
                        weight:400000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8878659),
                        parseFloat(145.0307134)),
                        weight:409800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2172515),
                        parseFloat(146.30971)),
                        weight:775000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1190139),
                        parseFloat(145.3201472)),
                        weight:576970
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.637014),
                        parseFloat(145.0951208)),
                        weight:572400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2285747),
                        parseFloat(145.1836253)),
                        weight:691000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2477049),
                        parseFloat(143.3197833)),
                        weight:645000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2836063),
                        parseFloat(145.6033704)),
                        weight:948660
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7302739),
                        parseFloat(148.089223)),
                        weight:340000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6902765),
                        parseFloat(148.4156549)),
                        weight:465000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:409169
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1308578),
                        parseFloat(145.8693142)),
                        weight:295000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8464377),
                        parseFloat(144.6391364)),
                        weight:265000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9622559),
                        parseFloat(146.0006153)),
                        weight:709000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.64746400000001),
                        parseFloat(145.0488612)),
                        weight:355000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.462209),
                        parseFloat(145.2123659)),
                        weight:554783
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3),
                        parseFloat(145.105)),
                        weight:950000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4603542),
                        parseFloat(144.0865809)),
                        weight:510000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:468500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9427818),
                        parseFloat(144.4714979)),
                        weight:840000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5705876),
                        parseFloat(143.7423389)),
                        weight:845000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.925),
                        parseFloat(145.333056)),
                        weight:84000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0974177),
                        parseFloat(145.3700328)),
                        weight:572120
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1207521),
                        parseFloat(145.3391132)),
                        weight:525882
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5323804),
                        parseFloat(144.9632374)),
                        weight:598409
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7098029),
                        parseFloat(145.0307349)),
                        weight:375000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.64746400000001),
                        parseFloat(145.0488612)),
                        weight:368125
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.904436),
                        parseFloat(142.6610422)),
                        weight:149950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7084797),
                        parseFloat(146.1735254)),
                        weight:830000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7573077),
                        parseFloat(148.2891394)),
                        weight:140000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5098367),
                        parseFloat(146.7770185)),
                        weight:330000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1802397),
                        parseFloat(145.1474292)),
                        weight:880000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8299212),
                        parseFloat(144.6455962)),
                        weight:468700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.599672),
                        parseFloat(143.8236646)),
                        weight:448976
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6041152),
                        parseFloat(145.8628005)),
                        weight:1371250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.82902),
                        parseFloat(144.6479749)),
                        weight:491315
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5420846),
                        parseFloat(144.9684514)),
                        weight:523288
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8523932),
                        parseFloat(145.4509176)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2403565),
                        parseFloat(144.3572448)),
                        weight:560058
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2403565),
                        parseFloat(144.3572448)),
                        weight:524081
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.09890120000001),
                        parseFloat(146.0452061)),
                        weight:1175000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9975695),
                        parseFloat(145.2248424)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0356889),
                        parseFloat(146.3781485)),
                        weight:700000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4274862),
                        parseFloat(146.5343216)),
                        weight:849000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.342575),
                        parseFloat(145.2124572)),
                        weight:470000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5532701),
                        parseFloat(142.2852033)),
                        weight:756250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0371132),
                        parseFloat(142.8185427)),
                        weight:590000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7456852),
                        parseFloat(144.6157325)),
                        weight:509022
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5423451),
                        parseFloat(144.9629782)),
                        weight:531196
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8133624),
                        parseFloat(144.6752802)),
                        weight:434586
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5430385),
                        parseFloat(145.9653559)),
                        weight:558879
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6042078),
                        parseFloat(145.0064295)),
                        weight:669538
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3803808),
                        parseFloat(144.6698355)),
                        weight:1350000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8464377),
                        parseFloat(144.6391364)),
                        weight:369000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5442626),
                        parseFloat(144.9879194)),
                        weight:335000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4695354),
                        parseFloat(146.5056032)),
                        weight:774500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8338061),
                        parseFloat(144.6671428)),
                        weight:15000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:567900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.65126),
                        parseFloat(144.5053764)),
                        weight:890000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7126488),
                        parseFloat(146.1009752)),
                        weight:682000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9175637),
                        parseFloat(145.1236632)),
                        weight:315000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4732258),
                        parseFloat(144.9698175)),
                        weight:456898
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.25),
                        parseFloat(144.303611)),
                        weight:487700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1194501),
                        parseFloat(147.4402167)),
                        weight:292000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9540104),
                        parseFloat(142.1671763)),
                        weight:22000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3958231),
                        parseFloat(145.3405236)),
                        weight:152000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5603115),
                        parseFloat(146.5287173)),
                        weight:300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2945672),
                        parseFloat(146.3385323)),
                        weight:940000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2204458),
                        parseFloat(145.1641042)),
                        weight:441854
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:388079
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.916667),
                        parseFloat(146)),
                        weight:729000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1731205),
                        parseFloat(144.6912948)),
                        weight:2500000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0419203),
                        parseFloat(141.7410906)),
                        weight:10900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2),
                        parseFloat(146.233333)),
                        weight:435000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8838197),
                        parseFloat(144.5933697)),
                        weight:288250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3877647),
                        parseFloat(143.8838257)),
                        weight:680000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5102491),
                        parseFloat(145.7474045)),
                        weight:876210
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.066667),
                        parseFloat(143.616667)),
                        weight:650700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8461361),
                        parseFloat(144.7404177)),
                        weight:473740
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2037192),
                        parseFloat(144.533448)),
                        weight:700000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7043066),
                        parseFloat(144.9194516)),
                        weight:285000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.22010270000001),
                        parseFloat(144.191706)),
                        weight:880000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3292839),
                        parseFloat(141.0022207)),
                        weight:95000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6897235),
                        parseFloat(144.7167148)),
                        weight:534771
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8299212),
                        parseFloat(144.6455962)),
                        weight:451883
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.702),
                        parseFloat(145.572)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5959426),
                        parseFloat(146.7953458)),
                        weight:1300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7180126),
                        parseFloat(145.1650246)),
                        weight:467500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2872867),
                        parseFloat(146.4730626)),
                        weight:819000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4955067),
                        parseFloat(145.8767117)),
                        weight:480000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0169444),
                        parseFloat(145.1352778)),
                        weight:534200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.77637370000001),
                        parseFloat(144.6910935)),
                        weight:474710
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:805550
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1942937),
                        parseFloat(146.507584)),
                        weight:320000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7185795),
                        parseFloat(144.5349356)),
                        weight:496000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3355958),
                        parseFloat(145.6689741)),
                        weight:520000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8886692),
                        parseFloat(147.0650375)),
                        weight:769500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0954208),
                        parseFloat(145.4820709)),
                        weight:544205
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7221792),
                        parseFloat(144.5727431)),
                        weight:425965
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8938569),
                        parseFloat(145.9442113)),
                        weight:995000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.845417),
                        parseFloat(141.6011181)),
                        weight:259000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0832539),
                        parseFloat(145.6748963)),
                        weight:660000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7207658),
                        parseFloat(144.723689)),
                        weight:638589
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1355776),
                        parseFloat(146.2181999)),
                        weight:530000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4205099),
                        parseFloat(143.8040591)),
                        weight:1750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7795957),
                        parseFloat(145.9644013)),
                        weight:440000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4732258),
                        parseFloat(144.9698175)),
                        weight:487390
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3033974),
                        parseFloat(144.5272851)),
                        weight:800000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.570013),
                        parseFloat(143.7989997)),
                        weight:468484
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6896508),
                        parseFloat(143.7993096)),
                        weight:1095000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6869179),
                        parseFloat(143.1021239)),
                        weight:147375
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9227365),
                        parseFloat(145.9677767)),
                        weight:1130000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0797079),
                        parseFloat(143.0552156)),
                        weight:159000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9581248),
                        parseFloat(146.9930633)),
                        weight:79000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6601609),
                        parseFloat(144.5948267)),
                        weight:410000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.433333),
                        parseFloat(144.75)),
                        weight:1925000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4024468),
                        parseFloat(146.1770148)),
                        weight:650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2586375),
                        parseFloat(144.0419036)),
                        weight:855000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0407412),
                        parseFloat(146.1081956)),
                        weight:208750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9350105),
                        parseFloat(143.1470726)),
                        weight:163750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1848793),
                        parseFloat(146.9417268)),
                        weight:499500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:527900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8747171),
                        parseFloat(147.109184)),
                        weight:433000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1748407),
                        parseFloat(145.3565226)),
                        weight:790000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8353563),
                        parseFloat(144.6577293)),
                        weight:375000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9242637),
                        parseFloat(144.1685956)),
                        weight:800900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.342961),
                        parseFloat(142.6227692)),
                        weight:190000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2950318),
                        parseFloat(144.1311117)),
                        weight:35000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6018557),
                        parseFloat(145.0298968)),
                        weight:528715
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.32250000000001),
                        parseFloat(143.983056)),
                        weight:695000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2285747),
                        parseFloat(145.1836253)),
                        weight:683600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8382977),
                        parseFloat(144.8610895)),
                        weight:221666
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.427),
                        parseFloat(145.05)),
                        weight:2420000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8885085),
                        parseFloat(144.5979967)),
                        weight:292500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4010289),
                        parseFloat(142.526198)),
                        weight:650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.3755719),
                        parseFloat(142.2035096)),
                        weight:110000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0042786),
                        parseFloat(143.0129871)),
                        weight:130000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8095016),
                        parseFloat(147.6508636)),
                        weight:125773
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1966523),
                        parseFloat(147.9023498)),
                        weight:115000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3732994),
                        parseFloat(144.8258814)),
                        weight:115000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1859168),
                        parseFloat(144.3782012)),
                        weight:336000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.040869),
                        parseFloat(145.2555671)),
                        weight:288000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3142943),
                        parseFloat(146.516411)),
                        weight:469000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8704673),
                        parseFloat(143.749458)),
                        weight:387000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.816305),
                        parseFloat(145.012002)),
                        weight:200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6838529),
                        parseFloat(141.834445)),
                        weight:499000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8270468),
                        parseFloat(143.8796572)),
                        weight:352250
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.968929),
                        parseFloat(145.7140853)),
                        weight:29000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9329967),
                        parseFloat(146.8497352)),
                        weight:475000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.4189846),
                        parseFloat(145.0607078)),
                        weight:400000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2720244),
                        parseFloat(147.0569376)),
                        weight:310000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6),
                        parseFloat(145.416667)),
                        weight:1650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.344075),
                        parseFloat(146.1365429)),
                        weight:605000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6352139),
                        parseFloat(145.1374967)),
                        weight:327500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8798352),
                        parseFloat(144.7317277)),
                        weight:539900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.793087),
                        parseFloat(144.4344864)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0407412),
                        parseFloat(146.1081956)),
                        weight:222500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7250298),
                        parseFloat(144.5724869)),
                        weight:456943
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3022517),
                        parseFloat(146.0528724)),
                        weight:485000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9424388),
                        parseFloat(142.1517138)),
                        weight:136000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2355063),
                        parseFloat(145.0495189)),
                        weight:130000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1596816),
                        parseFloat(145.5462102)),
                        weight:1600000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8151682),
                        parseFloat(147.3291671)),
                        weight:349000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7939691),
                        parseFloat(147.3892119)),
                        weight:349000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7500271),
                        parseFloat(145.7592709)),
                        weight:720000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4239071),
                        parseFloat(144.9946544)),
                        weight:523085
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3112505),
                        parseFloat(141.4824946)),
                        weight:412500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3305143),
                        parseFloat(146.0852867)),
                        weight:3880000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1288008),
                        parseFloat(145.2870179)),
                        weight:430000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5093344),
                        parseFloat(143.6783343)),
                        weight:600700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6515),
                        parseFloat(145.3173)),
                        weight:1700000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1383147),
                        parseFloat(145.758535)),
                        weight:775000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:662785
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7304579),
                        parseFloat(144.652914)),
                        weight:338000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5715571),
                        parseFloat(143.3801482)),
                        weight:66000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6821098),
                        parseFloat(144.4053802)),
                        weight:683550
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.233333),
                        parseFloat(145.633333)),
                        weight:1050000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.74529020000001),
                        parseFloat(143.7053732)),
                        weight:269000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:435100
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.6843388),
                        parseFloat(143.8632822)),
                        weight:329000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7132029),
                        parseFloat(145.6543908)),
                        weight:749999
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6387619),
                        parseFloat(146.4193903)),
                        weight:475000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.730101),
                        parseFloat(144.0346652)),
                        weight:240000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6023424),
                        parseFloat(146.5133073)),
                        weight:809000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.9859729),
                        parseFloat(147.6192928)),
                        weight:195000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0343093),
                        parseFloat(146.1049346)),
                        weight:524252
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:349000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0664383),
                        parseFloat(147.0168002)),
                        weight:375000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1432273),
                        parseFloat(142.4249023)),
                        weight:449000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3854255),
                        parseFloat(142.8989392)),
                        weight:575000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7468786),
                        parseFloat(142.2961114)),
                        weight:60000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0863471),
                        parseFloat(145.3338399)),
                        weight:686200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0863471),
                        parseFloat(145.3338399)),
                        weight:517000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5212524),
                        parseFloat(145.3686714)),
                        weight:459000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2689907),
                        parseFloat(146.1534622)),
                        weight:799000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9751742),
                        parseFloat(141.3049902)),
                        weight:280000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.692889),
                        parseFloat(144.720901)),
                        weight:527502
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7173398),
                        parseFloat(144.7002068)),
                        weight:420255
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6206264),
                        parseFloat(144.7003346)),
                        weight:273000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8936579),
                        parseFloat(145.4973617)),
                        weight:300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3820435),
                        parseFloat(147.8151071)),
                        weight:253500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7865867),
                        parseFloat(146.9944661)),
                        weight:249000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8609774),
                        parseFloat(144.8069561)),
                        weight:330000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3918627),
                        parseFloat(144.2628847)),
                        weight:600000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.372),
                        parseFloat(144.193)),
                        weight:765000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.592813),
                        parseFloat(145.023108)),
                        weight:508556
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.026823),
                        parseFloat(142.811186)),
                        weight:502260
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1471925),
                        parseFloat(144.3408579)),
                        weight:500000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5083216),
                        parseFloat(146.4989502)),
                        weight:2200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1870105),
                        parseFloat(144.4615766)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0780801),
                        parseFloat(145.2946557)),
                        weight:225500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.742132),
                        parseFloat(144.668243)),
                        weight:538078
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2561037),
                        parseFloat(141.9397094)),
                        weight:465000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6104251),
                        parseFloat(145.0449316)),
                        weight:550300
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:490906
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3712313),
                        parseFloat(144.8542145)),
                        weight:599000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.469398),
                        parseFloat(142.3989371)),
                        weight:299000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.65449220000001),
                        parseFloat(146.7282198)),
                        weight:449000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2680341),
                        parseFloat(147.2179602)),
                        weight:229000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8440928),
                        parseFloat(144.8422428)),
                        weight:520640
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7153701),
                        parseFloat(144.5806121)),
                        weight:500520
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.669374),
                        parseFloat(143.1602689)),
                        weight:130000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9242225),
                        parseFloat(145.995043)),
                        weight:707500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3502737),
                        parseFloat(143.7037043)),
                        weight:740000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.3367989),
                        parseFloat(144.5322761)),
                        weight:739903
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.1773993),
                        parseFloat(146.7464131)),
                        weight:1150000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5350094),
                        parseFloat(144.898635)),
                        weight:540000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0307598),
                        parseFloat(147.0217285)),
                        weight:695000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.309185),
                        parseFloat(145.171875)),
                        weight:239000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8585628),
                        parseFloat(142.7855161)),
                        weight:245000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2773243),
                        parseFloat(142.5058556)),
                        weight:335000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2229203),
                        parseFloat(147.6127051)),
                        weight:149000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.410872),
                        parseFloat(143.0778056)),
                        weight:527500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1636386),
                        parseFloat(145.9303651)),
                        weight:263770
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1462758),
                        parseFloat(145.2888835)),
                        weight:215000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.916667),
                        parseFloat(144.133333)),
                        weight:719000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8710154),
                        parseFloat(147.921537)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5182523),
                        parseFloat(144.9569214)),
                        weight:235000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.5198021),
                        parseFloat(145.580869)),
                        weight:1650000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.78179),
                        parseFloat(142.51819)),
                        weight:120000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0076276),
                        parseFloat(141.4592277)),
                        weight:50000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.5117948),
                        parseFloat(142.8553745)),
                        weight:935000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:341000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:622416
                        },

{location: new google.maps.LatLng(
                        parseFloat(-35.1564547),
                        parseFloat(142.6579563)),
                        weight:258000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.6549515),
                        parseFloat(145.5774025)),
                        weight:995000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.36184069999999),
                        parseFloat(145.53928)),
                        weight:1200000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:660000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.39),
                        parseFloat(145.089)),
                        weight:1300000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.3080678),
                        parseFloat(142.0413404)),
                        weight:450000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5985239),
                        parseFloat(143.9711539)),
                        weight:649000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6523225),
                        parseFloat(144.5741727)),
                        weight:404286
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4705238),
                        parseFloat(143.767428)),
                        weight:750000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.091944),
                        parseFloat(144.506111)),
                        weight:935000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.35),
                        parseFloat(144.616667)),
                        weight:1595000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0254826),
                        parseFloat(146.8423556)),
                        weight:365000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.824722),
                        parseFloat(146.1775)),
                        weight:265000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-34.77225),
                        parseFloat(142.6523403)),
                        weight:450000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7246379),
                        parseFloat(144.5707934)),
                        weight:308750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3573348),
                        parseFloat(145.3733112)),
                        weight:354400
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3208467),
                        parseFloat(147.8261046)),
                        weight:510000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2786096),
                        parseFloat(141.5337051)),
                        weight:450000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6909213),
                        parseFloat(143.5862259)),
                        weight:340000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7826453),
                        parseFloat(144.773863)),
                        weight:330000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.337633),
                        parseFloat(146.7222533)),
                        weight:349000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8977691),
                        parseFloat(146.5434647)),
                        weight:848000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2531884),
                        parseFloat(142.8717953)),
                        weight:110000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6636674),
                        parseFloat(144.5352149)),
                        weight:255000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7189863),
                        parseFloat(144.0506107)),
                        weight:210000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1030945),
                        parseFloat(144.2193567)),
                        weight:319000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.01021),
                        parseFloat(146.1511962)),
                        weight:525000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1924851),
                        parseFloat(144.3569235)),
                        weight:454600
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.0343093),
                        parseFloat(146.1049346)),
                        weight:411800
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2562044),
                        parseFloat(145.2625246)),
                        weight:515000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3344408),
                        parseFloat(145.4062917)),
                        weight:527300
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3819507),
                        parseFloat(145.4044117)),
                        weight:506000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.86499999999999),
                        parseFloat(145.753)),
                        weight:385000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8181073),
                        parseFloat(145.1238563)),
                        weight:490000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.892681),
                        parseFloat(147.853293)),
                        weight:190000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.215708),
                        parseFloat(144.2379564)),
                        weight:120000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7965156),
                        parseFloat(144.3757508)),
                        weight:399000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6212636),
                        parseFloat(145.0115965)),
                        weight:401783
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:449950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2319711),
                        parseFloat(146.3048179)),
                        weight:137200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.6705234),
                        parseFloat(145.1631346)),
                        weight:485000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8093176),
                        parseFloat(144.9715668)),
                        weight:621803
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:673090
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7003487),
                        parseFloat(144.7273513)),
                        weight:199950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0768115),
                        parseFloat(145.4519639)),
                        weight:341070
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1403799),
                        parseFloat(145.9511191)),
                        weight:513380
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:366500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.3500634),
                        parseFloat(145.5586858)),
                        weight:649000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0044156),
                        parseFloat(147.2652758)),
                        weight:1125000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0751737),
                        parseFloat(145.5007993)),
                        weight:219000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.6372041),
                        parseFloat(145.7141065)),
                        weight:499950
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.137096),
                        parseFloat(145.3745044)),
                        weight:395000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9107466),
                        parseFloat(145.6002839)),
                        weight:1400000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.5902879),
                        parseFloat(146.0247119)),
                        weight:245000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.8908218),
                        parseFloat(145.164489)),
                        weight:950000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0866074),
                        parseFloat(145.8523685)),
                        weight:679000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.1244006),
                        parseFloat(145.7791146)),
                        weight:398500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9237714),
                        parseFloat(144.9920238)),
                        weight:419000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0611204),
                        parseFloat(145.415089)),
                        weight:605700
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.1230949),
                        parseFloat(145.3288577)),
                        weight:567200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9453536),
                        parseFloat(143.2210793)),
                        weight:160000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.2441171),
                        parseFloat(144.4499914)),
                        weight:657100
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.285728),
                        parseFloat(143.2362296)),
                        weight:339200
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.4196665),
                        parseFloat(145.9692754)),
                        weight:930000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.2892964),
                        parseFloat(144.097732)),
                        weight:45000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.9302778),
                        parseFloat(145.4602778)),
                        weight:644999
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4706909),
                        parseFloat(144.9907946)),
                        weight:517735
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.4152281),
                        parseFloat(148.1205372)),
                        weight:413535
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.892471),
                        parseFloat(144.5964645)),
                        weight:424631
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7133958),
                        parseFloat(144.3337654)),
                        weight:486079
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.7495916),
                        parseFloat(144.2729928)),
                        weight:443500
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7214768),
                        parseFloat(144.7187351)),
                        weight:410750
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.272283),
                        parseFloat(144.6178236)),
                        weight:306166
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.2503018),
                        parseFloat(147.3479155)),
                        weight:339000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.9847807),
                        parseFloat(143.3906074)),
                        weight:354900
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.00346529999999),
                        parseFloat(145.2988538)),
                        weight:315000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-38.0738528),
                        parseFloat(145.3134501)),
                        weight:605773
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.8038066),
                        parseFloat(144.9644442)),
                        weight:380000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.434517),
                        parseFloat(143.7911684)),
                        weight:690000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.865707),
                        parseFloat(144.6150869)),
                        weight:426551
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7695649),
                        parseFloat(145.1591109)),
                        weight:759762
                        },

{location: new google.maps.LatLng(
                        parseFloat(-36.733333),
                        parseFloat(144.3)),
                        weight:617441
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.7582686),
                        parseFloat(145.3430147)),
                        weight:250000
                        },

{location: new google.maps.LatLng(
                        parseFloat(-37.735636),
                        parseFloat(144.6521937)),
                        weight:514266
                        },
];


        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 8,
          center: {lat: -37.8136276, lng: 144.9630576},
          mapTypeId: "roadmap",
        });
         var heatmap = new google.maps.visualization.HeatmapLayer({
              data: data,
                  //maxIntensity: 15000000,
		 dissipating: 0,
		 opacity: 0.8,
		 radius: 0.1,
            map,
          });

      }
