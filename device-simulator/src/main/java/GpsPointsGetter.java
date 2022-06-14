import java.awt.geom.Point2D;
import java.util.*;

public class GpsPointsGetter {

    private static final List<Point2D.Double> pointsList =
            new LinkedList<Point2D.Double>(Arrays.asList(
                    new Point2D.Double(44.1476666225065,12.237019585093257),
                    new Point2D.Double(44.147556197816414,12.237016902884243),
                    new Point2D.Double(44.14732413694175,12.237029240980227),
                    new Point2D.Double(44.14686227383697,12.237136529340823),
                    new Point2D.Double(44.146865786309114,12.236966477223795),
                    new Point2D.Double(44.147455540366536,12.236430035420817),
                    new Point2D.Double(44.14740169912249,12.235515938457574),
                    new Point2D.Double(44.14726707181166,12.23477833081477),
                    new Point2D.Double(44.147602436673715,12.236202583637969),
                    new Point2D.Double(44.14720562818688,12.236652658277926),
                    new Point2D.Double(44.146814975842524,12.237016365754862),
                    new Point2D.Double(44.14726461791268,12.237050161686675),
                    new Point2D.Double(44.14746367187477,12.237013683545847),
                    new Point2D.Double(44.147593439114324,12.237012074122212),
                    new Point2D.Double(44.14765180300365,12.237014219774828)));

    private static ListIterator<Point2D.Double> listIterator = pointsList.listIterator();

    public GpsPointsGetter() {
    }

    public Point2D.Double getStaticPoint(){
        if(listIterator.hasPrevious()){
            return pointsList.get(listIterator.previousIndex());
        } else {
            return pointsList.get(listIterator.nextIndex());
        }
    }

    public Point2D.Double getMovingPoint() {
        if(!listIterator.hasNext()){
            listIterator = pointsList.listIterator();
        }
        return listIterator.next();

    }
}
