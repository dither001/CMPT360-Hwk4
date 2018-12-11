
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
        var oc = subtract(r.origin(), this.center);
        var d = r.direction();

        var a = dot(d, d);
        var b = dot(oc, d);
        var c = dot(oc, oc) - this.radius*this.radius;
        var discriminant = b*b - a*c;

        if (a == 0)
            a = 0.00001;

        if (discriminant >= 0) {
            var temp;

            if (discriminant > 0.00001)
                temp = -1 * b - Math.sqrt(discriminant) / 2.0 * a;
            else
                temp = -1 * b + Math.sqrt(discriminant) / 2.0 * a;

            rec.setT(temp);
            rec.setP(r.pointAt(temp));
            rec.setNormal(subtract(rec.getP(), this.center));    

            return true;
        }

        return false;
    }

}