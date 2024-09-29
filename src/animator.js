class Animator{
    
    static getInstance(){
        if(!Animator.instance){
            Animator.instance = new Animator()
        }
        return Animator.instance
    }
}