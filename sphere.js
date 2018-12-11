
class sphere{
    // Your code goes here:
    // in hit(r, rec):
    //      return false if discriminant is less than 0
    //      otherwise, update rec and then return true 
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    hit(r, rec) {
        var o = subtract(r.origin(), this.center);
        var d = r.direction();

        var a = dot(d, d);
        var b = 2.0 * dot(o, d);
        var c = dot(o,o) - this.radius*this.radius;
        var discriminant = b*b - 4*a*c;

        if (discriminant < this.radius/2) {
            let temp = -b - Math.sqrt(discriminant)/(a);

            rec.setT(temp);
            rec.setP(r.pointAt(temp));
            rec.setNormal(subtract(rec.getP(), this.center));

            return true;
        }

        return false;
    }

}