from app import app, db
from models import Hospital

hospitals = [
    {
        "name": "Kenyatta National Hospital",
        "location": "Nairobi",
        "county": "Nairobi",
        "description": "Kenya’s largest referral and teaching hospital offering a wide range of medical services.",
        "image_url": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 20 2726300",
        "rating": 4.5,
    },
    {
        "name": "Aga Khan University Hospital",
        "location": "Parklands, Nairobi",
        "county": "Nairobi",
        "description": "Private hospital providing advanced tertiary medical care and teaching facilities.",
        "image_url": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 20 3662000",
        "rating": 4.8,
    },
    {
        "name": "Nairobi Hospital",
        "location": "Argwings Kodhek Road",
        "county": "Nairobi",
        "description": "Top private hospital offering specialized and emergency medical services.",
        "image_url": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 20 2845000",
        "rating": 4.6,
    },
    {
        "name": "Moi Teaching and Referral Hospital",
        "location": "Eldoret",
        "county": "Uasin Gishu",
        "description": "Second-largest referral hospital in Kenya, serving the western region.",
        "image_url": "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 53 2033471",
        "rating": 4.3,
    },
    {
        "name": "Coast General Teaching Hospital",
        "location": "Mombasa",
        "county": "Mombasa",
        "description": "Largest hospital in the coastal region, providing specialized medical services.",
        "image_url": "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 41 2314201",
        "rating": 4.2,
    },
    {
        "name": "Kisumu County Referral Hospital",
        "location": "Kisumu",
        "county": "Kisumu",
        "description": "Comprehensive medical facility offering outpatient, maternity, and surgery services.",
        "image_url": "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 57 2023215",
        "rating": 4.1,
    },
    {
        "name": "MP Shah Hospital",
        "location": "Nairobi",
        "county": "Nairobi",
        "description": "Modern private hospital offering advanced diagnostic and surgical care.",
        "image_url": "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 20 4285000",
        "rating": 4.7,
    },
    {
        "name": "Gertrude's Children's Hospital",
        "location": "Muthaiga, Nairobi",
        "county": "Nairobi",
        "description": "Leading children’s hospital in East Africa offering pediatric and neonatal care.",
        "image_url": "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 20 7209000",
        "rating": 4.9,
    },
    {
        "name": "Karen Hospital",
        "location": "Karen, Nairobi",
        "county": "Nairobi",
        "description": "Multi-specialty hospital providing healthcare excellence and advanced surgery.",
        "image_url": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 20 6820000",
        "rating": 4.6,
    },
    {
        "name": "Nakuru Provincial General Hospital",
        "location": "Nakuru",
        "county": "Nakuru",
        "description": "Public referral hospital offering quality health services in the Rift Valley region.",
        "image_url": "https://images.unsplash.com/photo-1624343285636-aba82fd5a124?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 51 2210500",
        "rating": 4.0,
    },
    {
        "name": "Thika Level 5 Hospital",
        "location": "Thika",
        "county": "Kiambu",
        "description": "Level 5 hospital offering maternity, emergency, and surgery services.",
        "image_url": "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400",
        "phone": "+254 67 21054",
        "rating": 4.2,
    },
    {
        "name": "Baringo County Referral Hospital",
        "location": "E/Ravine",
        "county": "Baringo",
        "description": "County referral hospital serving Baringo residents with specialized services.",
        "image_url": "https://plus.unsplash.com/premium_photo-1664303492452-76f0745336fd?auto=format&fit=crop&q=80&w=745",
        "phone": "+254 44 21344",
        "rating": 4.4,
    },
    {
        "name": "Medical Center",
        "location": "Eldoret",
        "county": "Uasin Gishu",
        "description": "Community-based medical center offering general healthcare services.",
        "image_url": "https://images.unsplash.com/photo-1581982231900-6a1a46b744c9?auto=format&fit=crop&q=80&w=1074",
        "phone": "+254 63 55667",
        "rating": 4.5,
    },
    {
        "name": "Pwani County Referral Hospital",
        "location": "Mombasa",
        "county": "Mombasa",
        "description": "Regional hospital providing cardiology, surgery, and maternal health services.",
        "image_url": "https://images.unsplash.com/photo-1710074213374-e68503a1b795?auto=format&fit=crop&q=80&w=736",
        "phone": "+254 72 784521",
        "rating": 4.8,
    },
    {
        "name": "Tenwek Mission Hospital",
        "location": "Bomet",
        "county": "Bomet",
        "description": "Faith-based mission hospital offering comprehensive healthcare services.",
        "image_url": "https://plus.unsplash.com/premium_photo-1661895714925-2c7a6be6be32?auto=format&fit=crop&q=80&w=687",
        "phone": "+254 89674532",
        "rating": 4.1,
    },
]

with app.app_context():
    db.drop_all()
    db.create_all()
    for h in hospitals:
        hospital = Hospital(**h)
        db.session.add(hospital)
    db.session.commit()
    print("✅ Database seeded with full hospital data")
