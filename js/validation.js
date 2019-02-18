module.exports = {
    goodSizes: (slices, [R, C, L, H]) => {
        for (let i = 0; i < slices.length; i++){
            let slice = slices[i]
            if(!(
                slice[0] >= 0 && 
                slice[1] >= 0 &&
                slice[2] >= 0 && 
                slice[3] >= 0 &&
                slice[0] < R &&
                slice[1] < C &&
                slice[2] < R &&
                slice[3] < C &&
                (slice[2]-slice[0]+1) * (slice[3]-slice[1]+1) >= 2*L
                (slice[2]-slice[0]+1) * (slice[3]-slice[1]+1) <= H
            )){
                return false
            }
        }
        return true
    },
    goodSize: (slice, [R, C, L, H]) => {
        if(!(
            slice[0] >= 0 && 
            slice[1] >= 0 &&
            slice[2] >= 0 && 
            slice[3] >= 0 &&
            slice[0] < R &&
            slice[1] < C &&
            slice[2] < R &&
            slice[3] < C &&
            (slice[2]-slice[0]+1) * (slice[3]-slice[1]+1) >= 2*L &&
            (slice[2]-slice[0]+1) * (slice[3]-slice[1]+1) <= H
        )){
            return false
        }
        else{
            return true
        }
    },
    noOverlapsBatch: (slices, slice) => {
        for(let i = 0; i < slices.length; i++){
            let over = false
            let left = false
            
            if(slice[1] > slices[i][3] || slices[i][1] > slice[3]){
                left = true
            }

            if(slice[2] < slices[i][0] || slices[i][2] < slice[0]){
                over = true
            }

            if (!(over || left)){
                return false
            }      
        }
        return true
    },
    noOverlaps: (slices, slice) => {
        for(let i = 0; i < slices.length; i++){
            let over = false
            let left = false
            
            if(slice[1] > slices[i][3] || slices[i][1] > slice[3]){
                left = true
            }

            if(slice[2] < slices[i][0] || slices[i][2] < slice[0]){
                over = true
            }

            if (!(over || left)){
                return false
            }      
        }
        return true
    },
    enoughL: (L, slice, pizza) => {
        let M = 0
        let T = 0
        for (let i = 0; i < slice[2] - slice[0] + 1; i++){
            for (let j = 0; j < slice[3] - slice[1] + 1; j++){
                if(pizza[slice[0] + i][slice[1] + j] == "T"){
                    T += 1
                }
                if(pizza[slice[0] + i][slice[1] + j] == "M"){
                    M += 1
                }
            }
        }
        if(T >= L && M >= L){
            return true
        }
        else{
            return false
        }
    },
    countPoints: (slices) => {
        let points = 0
        let slice
        for(let i = 0; i < slices.length; i++){
            slice = slices[i]
            points += (slice[2] - slice[0] + 1) * (slice[3] - slice[1] + 1)
        }
        return points
    }
}