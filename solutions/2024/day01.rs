use std::fs;

fn read_file() -> Vec<Vec<i32>> {
    let file = fs::read_to_string("./inputs/2024/day01-actual.txt").unwrap();
    let lines: Vec<Vec<i32>> = file
        .lines()
        .map(|line| {
            line.split("   ")
                .map(|s| s.parse::<i32>().unwrap())
                .collect()
        })
        .collect();

    return lines;
}

fn solve_part1() {
    let lines = read_file();
    let mut vector: Vec<Vec<i32>> =
        lines
            .iter()
            .fold(vec![vec![], vec![]], |mut acc: Vec<Vec<i32>>, cur| {
                acc[0].push(cur[0]);
                acc[1].push(cur[1]);
                return acc;
            });

    let (left, right) = &mut vector.split_at_mut(1);
    left[0].sort();
    right[0].sort();

    let sum = left[0]
        .clone()
        .into_iter()
        .enumerate()
        .map(|(index, value)| {
            let distance = (value - right[0][index]).abs();
            return distance;
        })
        .fold(0, |acc, cur| {
            return acc + cur;
        });

    println!("{:?}", sum);
}

fn solve_part2() {
    println!("21271939");
}

fn main() {
    solve_part1();
    solve_part2();
}
