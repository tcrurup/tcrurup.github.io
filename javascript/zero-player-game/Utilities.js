class Utilities{
    static clamp(val, min, max){

        //Do a post about why this works if you can ever wrap your brain aroun this muggle magic
        return Math.max(Math.min(val, max), min);
    }
}

export default Utilities