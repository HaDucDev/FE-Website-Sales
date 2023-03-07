import Chart from "react-google-charts";
import React from "react";

const AdminStatistical = () => {


    const generateColor = () => {//lay mau ngau nhien
        let r = parseInt(Math.random() * 255);
        let g = parseInt(Math.random() * 255);
        let b = parseInt(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const data = [
        ["name", "money", { role: "style" }],
        ["John", 1000, generateColor()],
        ["Mary", 2000, generateColor()],
        ["Tom", 1500, generateColor()],
        ["Lucy", 3000, generateColor()],
        ["Bob", 1200, generateColor()],
    ];
    return (
        <>Trang Thong Ke

            <Chart
                width={800}
                height={500}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: "Doanh thu theo loại sản ph",
                    // Just add this option
                    is3D: true,
                    //colors: colors,
                }}
                rootProps={{ "data-testid": "2" }}
            />
        </>
    )

}

export default AdminStatistical;