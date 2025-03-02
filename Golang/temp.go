package main

// import "fmt"

// func main(){
//     val := [][]int{
//         {0, 1, 1, 1},
//         {1, 1, 1, 1},
//         {0, 1, 1, 1},
//     }

//     fmt.Println(countSquares(val))
// }

func countSquares(matrix [][]int) int {
    rows := len(matrix)
    cols := len(matrix[0])
    m_computed := make([][]int, rows)
    for i := range m_computed {
        m_computed[i] = make([]int, cols)
    }

    for i, row := range matrix{
        one_streak := 0
        for j, elem := range row{
            if elem == 1{
                one_streak += 1
            } else {
                one_streak = 0
            }
            m_computed[i][j] = one_streak
        }
    }

    res := 0
    for i := 0; i < rows; i++ {
        for j := 0; j < cols; j++ {
            res += computeSubmatrices(i,j, rows, m_computed)
        }
    }
    return res
}

// compute the number of submatrices that we can made, only checking for bottom and right values
func computeSubmatrices(i,j, rows int, m_computed [][]int ) int {
    maxComputableSize := min(rows - i, j+1)
    // try to match submatrix of size k, if it works continue, else early break
    numOfSubMatrices := 0
    for k := 1; k <= maxComputableSize; k++{
        subColumn := make([]int, k)
        for x := 0; x < k; x++ {
            subColumn[x] = m_computed[i+x][j]
        }
        if allElementsGreaterOrEqualThan(subColumn, k){
            numOfSubMatrices += 1
        } else {
            break
        }
    }
    return numOfSubMatrices
}

func allElementsGreaterOrEqualThan(slice []int, target int) bool {
    for _, elem := range slice {
        if elem < target {
            return false
        }
    }
    return true
}

func min(a,b int) int {
    if a < b{
        return a
    }
    return b
}

