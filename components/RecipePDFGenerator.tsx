/* eslint-disable  @typescript-eslint/no-explicit-any */

import React from 'react'
import jsPDF from 'jspdf'
import autoTable, { applyPlugin } from 'jspdf-autotable'
import { ArrowDownToLine } from 'lucide-react';

applyPlugin(jsPDF)

interface RecipePDFGeneratorProps {
    recipe: RecipeWithCategoryAndDetails
}


const RecipePDFGenerator: React.FC<RecipePDFGeneratorProps> = ({ recipe }) => {
   
    const generatePDF = () => {
        const doc = new jsPDF()
        // Ajout d'un fond 
        const backgroundColor = '#131827'
        doc.setFillColor(backgroundColor)
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F') // 'F' me permet de remplir avec la couleur choisie
        doc.setTextColor('#FFFFFF')
        // doc.setTextColor('#D0FE23')

        doc.setFontSize(18)
        doc.setFont('helvetica','bold')
        doc.text(recipe.name, 10, 10)
        
        doc.setFontSize(12)
        doc.setFont('helvetica','bold')
        doc.text('Category: ', 10, 20)
        doc.setFont('helvetica','normal')
        doc.text(recipe.category.categoryName, 32, 20)
        doc.setFont('helvetica','bold')
        doc.text('Preparation Time: ', 10, 30)
        doc.setFont('helvetica','normal')
        doc.text(`${ recipe.preparationTime} min`, 48, 30)
        doc.setFont('helvetica','bold')
        doc.text('Description: ', 10, 40)
        doc.setFont('helvetica','normal')

        // doc.text(`Category: ${ recipe.category.categoryName}`, 10, 20)

        const descriptionLines = doc.splitTextToSize(recipe.description, 180)
        doc.text(descriptionLines, 10, 46)


        // Tableau des ingrédients
        const ingredientsData = recipe.ingredients.map((ingredient) => [
            ingredient.ingredient.ingredientName,
            `${ingredient.quantity} ${ingredient.unit}`,
        ])

        autoTable(doc,{
            headStyles:{ fillColor: [235,137,106]},
            startY: 60 + descriptionLines.length * 4,
            head: [['Ingredient', 'Quantity']],
            body: ingredientsData,
            margin: { left:10, right: 10 },
            theme: 'striped',
        })

        // Tableau des ustensiles
        const toolsData = recipe.tools.map((tool) => [
            tool.tool.toolName
        ])

        autoTable( doc,{
            headStyles:{ fillColor: [235,137,106]},
            startY: (doc as any).lastAutoTable.finalY + 10,
            head: [['Tool']],
            body: toolsData,
            margin: { left:10, right: 10 },
            theme: 'striped',
        })

        // Tableau des étapes
        const stepsData = recipe.steps.map((step) => [
            `Step ${step.stepNumber}`,
            step.text,
        ])

        autoTable( doc,{
            headStyles:{ fillColor: [235,137,106]},
            startY: (doc as any).lastAutoTable.finalY + 10,
            head: [['Step', 'Instruction']],
            body: stepsData,
            margin: { left:10, right: 10 },
            theme: 'striped',
        })

        doc.save(`${recipe.name}.pdf`)
         // génération d'un blob pour la prévisualisation
        // const pdfBlob = doc.output('blob')
        // const pdfUrl = URL.createObjectURL(pdfBlob)
        // window.open(pdfUrl)

    }

  return (
    <button
    onClick={generatePDF}
    className='flex gap-2 items-center px-4 py-2 bg-salmon rounded-lg text-white'
    >
       <ArrowDownToLine size={18} />Download
    </button>
  )
}

export default RecipePDFGenerator
